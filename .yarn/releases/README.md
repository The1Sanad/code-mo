# Yarn Releases

This directory is intended to store Yarn binary releases when using Yarn Berry (Yarn 2+) with the `yarnPath` setting.

The CI/CD pipeline has been updated to use npm instead of Yarn to avoid dependency on the Yarn binary file.

If you want to switch back to using Yarn Berry:

1. Run `yarn set version berry` to download the latest Yarn binary
2. Update the `.yarnrc.yml` file to include the `yarnPath` setting pointing to the downloaded binary
3. Update the GitHub Actions workflow to use Yarn instead of npm