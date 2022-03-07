#!/usr/bin/env bash

function parseOptions() {

  reset_global_vars

  while [ "$1" != "" ]; do
    case $1 in
    --patch)
      VERSIONING="patch"
      ;;
    --minor)
      VERSIONING="minor"
      ;;
    --major)
      VERSIONING="major"
      ;;
    -d | --dry-run)
      DRY_RUN=true
      ;;
    *)
      echo "Unknown command line argument: $1"
      return 1
      ;;
    esac
    shift
  done

  if [ "${VERSIONING}" = "" ]; then
    VERSIONING="patch"
  fi

  if [ $DRY_RUN ]; then
      echo "-----------------------------"
      echo "---------- DRY_RUN ----------"
      echo "-----------------------------"
  fi
}

function publish() {

    parseOptions "$@"

    if [ -z "$(git status -s --untracked-files=no --porcelain)" ]; then
        # Working directory clean excluding untracked files
        (run_command "git checkout -B upgrade")
    else
        # Uncommitted changes in tracked files
        echo "please commit or stash changes"
        return $?;
    fi

    (run_command "npm whoami")
    if [ $? -ne 0 ]; then
        npm login
    fi

    (run_command "npm run bump-$VERSIONING")
    if [ $? -ne 0 ]; then
        echo "please fix errors"
        return $?;
    fi

    echo "Enter the otp to login to npmjs.com: "
    read -r otp
    (run_command "npm publish --otp $otp")
    if [ $? -ne 0 ]; then
        echo "unable to login to npmjs.com"
        return $?;
    fi

    local tag
    tag=$(npm show . version)
    tag="${tag##*( )}"
    tag="${tag%%*( )}"
    tag="v${tag}"

    (run_command "git checkout -B develop")
    if [ $? -ne 0 ]; then
        echo "unable to checkout develop"
        return $?
    fi

    (run_command "git merge upgrade --no-ff")
    if [ $? -ne 0 ]; then
        echo "unable to merge upgrade branch to develop"
        return $?
    fi

    (run_command "git push origin develop")
    if [ $? -ne 0 ]; then
        echo "unable to push develop"
        return $?
    fi

    (run_command "git checkout -B main")
    if [ $? -ne 0 ]; then
        echo "unable to checkout main"
        return $?
    fi

    (run_command "git merge $tag")
    if [ $? -ne 0 ]; then
        echo "unable to merge $tag to main"
        return $?
    fi

    (run_command "git push origin main")
    if [ $? -ne 0 ]; then
        echo "unable to push main"
        return $?
    fi

    reset_global_vars

    (run_command "npm logout")
    return $?
}

function run_command() {
    if [ $DRY_RUN ]; then
        echo "$1"
    else
        eval "$1"
    fi
    return $?
}

function reset_global_vars() {
    unset VERSIONING
    unset DRY_RUN
}

publish "$@"
