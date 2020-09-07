# GitHub Actions for Civo

This action enables you to interact with [Civo](https://www.civo.com/) services by installing [the `civo` command-line client](https://github.com/civo/cli).

## Usage

To install the latest version of `civo` and use it in GitHub Actions workflows, add the following step:

```yaml
    - name: Install civo
      uses: civo/action-civo@master
      with:
        token: ${{ secrets.CIVO_TOKEN }}
```

`civo` will now be available in the virtual environment and can be used directly in following steps. As an example, one common use case is retrieving the credentials for a Kubernetes cluster hosted on Civo for use in a deployment workflow:

```yaml
    - name: Save Civo kubeconfig
      run: civo kubernetes config CLUSTER_NAME -s -p /tmp/kube.config
```

### Arguments

- `token` – (**Required**) A Civo personal access token.

## Contributing

To install the needed dependencies, run `npm install`. The resulting `node_modules/` directory _is not_ checked in to Git.

Before submitting a pull request, run `npm run package` to package the code [using `ncc`](https://github.com/zeit/ncc#ncc). Packaging assembles the code including dependencies into one file in the `dist/` directory that is checked in to Git.

## License

This GitHub Action and associated scripts and documentation in this project are released under the [MIT License](LICENSE).
