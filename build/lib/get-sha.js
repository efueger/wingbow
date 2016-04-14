const git = require(`gulp-git`);

module.exports = getSha;

////////////////////

function getSha() {
    const options = {
        args: `--short --verify HEAD`,
        quiet: true,
    };
    return new Promise((resolve, reject) => {
        git.revParse(options, (err, sha) => {
            if (err) {
                reject(err);
            } else {
                resolve(sha);
            }
        });
    });
}
