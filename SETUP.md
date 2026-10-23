# Set up the GitHub profile README

Follow these steps to publish this README in the `msnjsk/msnjsk` profile
repository and enable the contribution snake animation.

## 1. Prepare the README

1. Open `README.md` in this project.
2. Replace `https://www.linkedin.com/in/YOUR-LINKEDIN/` with your LinkedIn URL.
3. Check the project descriptions and links, and change anything that does not
   match your work. Only `printlab-studio` and `pixel-perfect-ui` are public
   right now, so only those projects can be linked to publicly.

## 2. Add the files to your profile repository

The profile repository must be named `msnjsk/msnjsk`. Add these files to it:

- Put this project's `README.md` at the **root** of the repository (not inside
  a folder).
- Put this project's `snake.yml` at
  `.github/workflows/snake.yml`. The `.github/workflows` folders must be part
  of the path.

You can upload the files on GitHub, or use Git. With Git, clone the profile
repository, copy the prepared `README.md` and workflow file into the paths
above, then commit and push them:

```bash
git clone https://github.com/msnjsk/msnjsk.git
cd msnjsk
# Copy README.md here, and copy snake.yml to .github/workflows/snake.yml.
git add README.md .github/workflows/snake.yml
git commit -m "Set up profile README"
git push
```

If you upload files on GitHub, create the workflow using the full path
`.github/workflows/snake.yml` so GitHub recognizes it as an Actions workflow.

## 3. Allow the workflow to publish the snake

The workflow saves its SVG files to a branch named `output`. Give it permission
to create and update that branch:

1. In the `msnjsk/msnjsk` repository on GitHub, open **Settings**.
2. Select **Actions → General**.
3. Scroll to **Workflow permissions**.
4. Select **Read and write permissions** and click **Save**.

## 4. Run the workflow once

1. Open the repository's **Actions** tab.
2. Select **Generate contribution snake** in the workflow list on the left.
3. Click **Run workflow**, leave the branch set to `main`, then click the
   green **Run workflow** button in the menu.
4. Wait for the run to finish. A green check means it succeeded. Open
   **Code** and confirm that an `output` branch now exists.

The README already points to the SVG files on that `output` branch. Once the
branch exists, the snake should appear on your profile. The workflow also runs
daily and when you push to `main`.

## 5. Optional: include private contributions in your profile graph

Stats cards count public activity by default. To show private contribution
counts on your GitHub profile, open **Settings → Public profile → Contributions**
and turn on **Include private contributions**. This shows contribution counts,
not private repository details.
