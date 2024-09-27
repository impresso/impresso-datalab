# Impresso Datalab

Welcome to the Impresso Datalab repository!
Impresso Datalab is designed to highlight the research and analysis conducted within the Impresso project. It serves as a platform to display interactive Jupyter notebooks, allowing visitors to explore our methodologies, data, and findings through ipynb notebooks.

## Features

The Impresso Datalab offers several features, including the ability to showcase individual Jupyter notebooks and display series of related notebooks. It also provides automatic synchronization with notebooks hosted on GitHub, ensuring that the latest versions are always available. Additionally, the platform includes detailed contributor information and attribution, recognizing the efforts of all team members involved.
Happy researching and sharing with Impresso Datalab!

## Contributing

We welcome contributions from team members! To add your notebook to the Impresso Datalab, follow these steps:

1. Get the public url of the ipynb file you want to reference
2. Create a MDX file in `src/content/notebooks/` and fill only its [frontmatter](https://mdxjs.com/guides/frontmatter/): the content of the notebook will be automatically fetched right after your commit. Its filename should be the slugified version of the title you wish to give to the notebook.
3. Create or update notebook creators or collaborators information in `src/content/authors/`. Its filename will be the local identifier of the person mentioned.

In the frontmatter of your MDX file, please include the following key information:

- `title`: The title of your notebook.
- `githubUrl`: The URL pointing to your notebook's repository on GitHub.
- `excerpt`: An optional text providing a brief excerpt or summary of the notebook.
- `authors`: An array of contributor slugs.

Optionally, you can include the following additional information:

- `googleColabUrl`: An optional string representing the Google Colab URL of the notebook.
- `tags`: An optional array of strings representing tags associated with the notebook.
- `seealso`: An optional array of strings representing related notebooks (use the notebook filename without the suffix).

Example frontmatter for a notebook MDX file:

```yaml
---
title: The title of your notebook
githubUrl: https://github.com/your-username/your-repo/blob/main/notebooks/your-notebook.ipynb
excerpt: This notebook explores the impact of something on something else.
authors:
  - john-doe
  - tizio-caio
---
```

As soon as you push your changes to the repository, the Impresso Datalab will automatically update the notebooks list (or display errors if the frontmatter is not correctly formatted or the referenced notebook is not found) and update the notebook frontmatter with the latest information of the latest commit on the remote github repository.

## Creating series of notebooks

To create a series of related notebooks just create an MDX file in `src/content/series/`.
In the frontmatter of your series MDX file, include the following information:

- `title`: The title of your notebook series
- `excerpt`: A brief description of the series
- `notebooks`: An array of notebook slugs that belong to this series

Feel free to add images or other content to the body of the MDX file to provide additional context or information about the series.

## Development

The Impresso Datalab is built using AstroJS and MDX. The Impresso Datalab is connected to the Impresso API and the Impresso WebSocket API and locally you have to provide the full URL to the API and WebSocket API.

```bash
npm install

PUBLIC_IMPRESSO_API_HOST=http://ws.localhost \
PUBLIC_IMPRESSO_API_PATH=/public-api \
PUBLIC_IMPRESSO_WS_API_HOST=http://api.localhost \
PUBLIC_IMPRESSO_WS_API_PATH=/api/socket.io \
npm run dev
```

To force the download of recent notebooks, you can run the following command:

```bash
npm run updatenotebooks
```

## Support

If you encounter any issues or have questions about contributing, please open an issue in this repository.

# Project

The 'Impresso - Media Monitoring of the Past' project is funded by the Swiss National Science Foundation (SNSF) under grant number [CRSII5_173719](http://p3.snf.ch/project-173719) (Sinergia program). The project aims at developing tools to process and explore large-scale collections of historical newspapers, and at studying the impact of this new tooling on historical research practices. More information at https://impresso-project.ch.

## License

Copyright (C) 2024 The Impresso team. Contributors to this program include: [Daniele Guido](https://github.com/danieleguido), [Kirill Mitsurov](https://github.com/donsiamese) and [Roman Kalyakin](https://github.com/theorm).
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but without any warranty; without even the implied warranty of merchantability or fitness for a particular purpose. See the [GNU Affero General Public License](https://github.com/impresso/impresso-datalab/blob/master/LICENSE) for more details.
