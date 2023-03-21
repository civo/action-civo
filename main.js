const core = require('@actions/core');
const exec = require('@actions/exec');
const tc = require('@actions/tool-cache');
const { Octokit } = require("@octokit/rest");

const baseDownloadURL = "https://github.com/civo/cli/releases/download"
const fallbackVersion = "1.0.48"
const octokit = new Octokit();

async function downloadDoctl(version) {
    if (process.platform === 'win32') {
        const civoDownload = await tc.downloadTool(`${baseDownloadURL}/v${version}/civo-${version}-windows-amd64.zip`);
        return tc.extractZip(civoDownload);
    }
    if (process.platform === 'darwin') {
        const civoDownload = await tc.downloadTool(`${baseDownloadURL}/v${version}/civo-${version}-darwin-amd64.tar.gz`);
        return tc.extractTar(civoDownload);
    }
    const civoDownload = await tc.downloadTool(`${baseDownloadURL}/v${version}/civo-${version}-linux-amd64.tar.gz`);
    return tc.extractTar(civoDownload);
}

async function run() {
  try {
    var version = core.getInput('version');
    if ((!version) || (version.toLowerCase() === 'latest')) {
        version = await octokit.repos.getLatestRelease({
            owner: 'civo',
            repo: 'cli'
        }).then(result => {
            return result.data.name;
        }).catch(error => {
            // GitHub rate-limits are by IP address and runners can share IPs.
            // This mostly effects macOS where the pool of runners seems limited.
            // Fallback to a known version if API access is rate limited.
            core.warning(`${error.message}

Failed to retrieve latest version; falling back to: ${fallbackVersion}`);
            return fallbackVersion;
        });
    }
    if (version.charAt(0) === 'v') {
        version = version.substr(1);
    }

    var path = tc.find("civo", version);
    if (!path) {
        const installPath = await downloadDoctl(version);
        path = await tc.cacheDir(installPath, 'civo', version);
    }
    core.addPath(path);
    core.info(`>>> civo version v${version} installed to ${path}`);

    var token = core.getInput('token', { required: true });
    core.setSecret(token);
    await exec.exec('civo apikey save action ', [token]);
    await exec.exec('civo apikey use action');
    core.info('>>> Successfully logged into civo');
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run();
