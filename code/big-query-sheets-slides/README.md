---
sidebar_label: BigQuery Sheets Slides
description: BigQuery Sheets Slides.
---

# BigQuery Sheets Slides

## Setup

### Create apps script

[Create App Script](https://script.google.com/)

Click on New project.

Example name: `big-data-sheets-gas-1`

### Create Google could console project

Go to https://console.cloud.google.com/projectcreate

Example name: `big-data-sheets-cloud-1`

Click Create

### Go to APIs & services > OAuth consent screen

Go to https://console.cloud.google.com/apis/credentials/consent

Select "Internal" and click Create

App name: `Big Data Codelab`

Enter emails

Save and continue

Again, Save and continue

Get project number by clicking on `three dots` and project settings in Nav bar:

Example: `xxx332xxxx`

### Connect Apps Script project to Google Cloud console project

Go to Apps Script editor > Project settings

Under GCP > Change Project

Enter project number, example: `xxx332xxxx`

Go to `Editor` > `Services`, `+`, select BigQuery API

Go to Enable API section in Cloud console and enable the `BigQuery API`

### Add Test User

Go to OAuth consent screen in Cloud console and add test user even if you are the owner.

### Run 

Run the app, you will see Sheets and Slides generated.

### Troubleshooting

Check the `tech-support` section on [Hagrito](https://hagrito.com) site for `google-apps-script`.

### Output

[tp4BIJ9.png (924×550)](https://i.imgur.com/tp4BIJ9.png)

[0ctkEUr.png (1678×866)](https://i.imgur.com/0ctkEUr.png)

## References

[Turn your big data into insights using Google Sheets and Slides](https://codelabs.developers.google.com/codelabs/bigquery-sheets-slides/#0)