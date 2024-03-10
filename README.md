# Impresso Datalab

Welcome to Impresso Datalab! This is Gatsby powered website that federates community resources and curated Jupyter Notebooks for the study of historical newspapers, using our _impresso_ API.
You will find on this website tutorials and resources

## How to add a notebook

Notebooks are markdown files stored in the `src/notebooks` directory. Each notebook describes a Jupyter notebook that solves a specific problem or demonstrates a specific feature of the _impresso_ API. The notebook is described using a YAML front matter:

```yaml
---
title: "Title of the notebook"
description: "A short description of the notebook"
authors:
  - author-name-id
date: "Date of the notebook"
collections:
  - collection-name-1
binderUrl: "<URL to the Binderhub instance to run this notebook>"
video:
  oembed: https://www.youtube.com/oembed?url=https%3A//youtube.com/watch%3Fv%3DM3r2XDceM6A&format=json
---
```

### Step 1. Prepare a repo and test with Binderhub

The first step is to prepare a repository with the Jupyter notebook and the necessary dependencies. You can use the `requirements.txt` file to list the dependencies. Once the repository is ready, you can test it with Binderhub.
You can check the [Binderhub documentation](https://mybinder.readthedocs.io/en/latest/) for more information.

## Deployment

CUrrent deployment is on github pages. Deployment is automated using github actions. The deployment script is in the `.github/workflows/gatsby.yml` file.
As this gatsby website actually load data from a static API, please add the correct subpath as env variable, in `GATSBY_PATH_PREFIX` in the action files.
