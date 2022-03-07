#!/usr/bin/env bash

function publish() {

    dry_run=$1

    if [ -z "$(git status -s --untracked-files=no --porcelain)" ]; then
        # Working directory clean excluding untracked files
        git checkout -B upgrade
    else
        # Uncommitted changes in tracked files
        echo "please commit or stash changes"
        return $?;
    fi

    (run_command "npm whoami" $dry_run true)
    if [ $? -ne 0 ]; then
        npm login
    fi

    (run_command "npm run bump-patch" $dry_run)
    if [ $? -ne 0 ]; then
        echo "please fix errors"
        return $?;
    fi

    echo "Enter the otp to login to npmjs.com: "
    read otp
    (run_command "npm publish --otp $otp" $dry_run)
    if [ $? -ne 0 ]; then
        echo "unable to login to npmjs.com"
        return $?;
    fi

    (run_command "npm logout" $dry_run true)
    return $?
}

function run_command() {

    echo "Running command $1 in dry_run=$2 mode silently=$3"

    if [ "$2" = "true" ]; then
        echo "$1"
    else
        if [ "$3" = "true" ]; then
            eval "$1 &> /dev/null"
        else
            eval "$1"
        fi
    fi
    return $?
}

publish "$@"
