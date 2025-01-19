# Visualizing-Bear-Attacks-in-North-America
Using D3 in JavaScript, the data on bear attacks over the last hundred years in North America is visualized


## Overview
The threat of bear attacks in North America has long intrigued researchers and the general public alike. With the advent of data-driven insights, we can now better understand the patterns and causes behind these attacks. This project aimed to visualize a dataset of bear attacks in North America sourced from Kaggle. The primary focus was on key attributes such as age, gender, date, location, and type of bear. Through a series of carefully constructed visualizations, including a line graph, bar chart, map, and pie charts, we aimed to provide a comprehensive and accessible analysis of this data.

## Prerequisites
To run the project, you need to have the following tools and libraries installed:
- HTML
- JavaScript
- CSS
- Nodemon

You can install Nodemon using npm:
```bash
npm install -g nodemon
```
## Usage
1. Clone the repository:
```bash
git clone https://github.com/lucy-harazin/Visualizing-Bear-Attacks-in-North-America.git
```
2. Navigate to the project directory:
```bash
cd Visualizing-Bear-Attacks-in-North-America/Visualizing Bear Attacks in North America
```
3. Start the server using Nodemon:
```bash
nodemon index.js
```
4. Open your browser and go to http://localhost:3000 to see the visualizations.

## Project Structure
- index.js: JavaScript file used to run visualizations in personal browser
- index.html: Main HTML file
- main.js: JavaScript file containing the logic for the visualizations
- styles.css: CSS file for styling the visualizations
- data.csv: CSV file containing the data for the visualizations

## Dataset
The dataset used in this project is sourced from Kaggle and includes information on bear attacks in North America, including the date, location, type of bear, and severity of the attack.

## Visualizations
- Line Graph: Visualizes the number of bear attacks over time, presented by year. Each year is marked with distinct points, and a hover feature provides detailed information about the number of attacks.
![Screenshot (131)](https://github.com/user-attachments/assets/b4d6e287-aad9-48a2-a1c7-1fb3fc24633b)

- Bar Chart: Shows the number of bear attacks categorized by the age of victims, with menu buttons to filter data based on gender.
![Screenshot (129)](https://github.com/user-attachments/assets/555659af-b6c2-40b8-a0a4-67319a2792be)

- Map: Highlights the locations of bear attacks across North America, with color-coded points indicating the year of attacks.
![Screenshot (127)](https://github.com/user-attachments/assets/b7f252bf-112d-4c45-a50b-e0b39c625583)

- Pie Charts: One pie chart shows the number of attacks involving different types of bears, while the other compares the number of attacks occurring in the wild versus captivity.
  
![Screenshot (132)](https://github.com/user-attachments/assets/bd0f666c-77d1-4075-ab34-fddde552608a)
![Screenshot (133)](https://github.com/user-attachments/assets/4d5ce3ba-df33-4561-adb7-23bd19a26e80)
