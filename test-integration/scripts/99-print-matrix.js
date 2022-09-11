#!/usr/bin/env node
const { writeFileSync, readFileSync } = require('fs');

const MATRIX_FILE = 'matrix.json';

let existing = {};
try {
    existing = JSON.parse(readFileSync(MATRIX_FILE));
} catch (_) {
    // eslint-disable-next-line no-console
    console.log(`File ${MATRIX_FILE} not found`);
    existing = { include: [] };
}

writeFileSync(
    MATRIX_FILE,
    JSON.stringify(
        {
            include: [
                ...existing.include,
                ...process.argv
                    .slice(2)
                    .map((file) => {
                        try {
                            // eslint-disable-next-line global-require,import/no-dynamic-require
                            return require(`../../${file}`).include;
                        } catch (_) {
                            // eslint-disable-next-line no-console
                            console.log(`File ${file} not found`);
                            return [];
                        }
                    })
                    .flat(),
            ],
        },
        null,
        2
    )
);
