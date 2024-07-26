# Testing Tranformers

This is a simple frontend application that provides three main functionalities:

1. **Image Analysis**: Analyzes and describes the content of an uploaded image.
2. **Text Sentiment Analysis**: Analyzes the sentiment (positive, negative, or neutral) of a given text.
3. **YouTube Comment Sentiment Analysis**: Analyzes the sentiment of the comments on a specified YouTube video.

With this project i tried to test the capabilities of integrating AI models in the frontend using the Transformers library. By leveraging these models, you can provide advanced functionalities directly in the browser without relying on a backend server.

## Features

- **Image Analysis**: Upload an image to get an analysis of its content.
- **Text Sentiment Analysis**: Input any text to get a sentiment analysis.
- **YouTube Comment Sentiment Analysis**: Input a YouTube video URL to analyze the sentiment of its comments.

## Prerequisites

To use the YouTube comment sentiment analysis feature, you will need an API key for the YouTube Data API v3. You can obtain this key from the [Google Developer Console](https://console.developers.google.com/).

## Getting Started

### 1. Clone the Repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/jorbelca/testing_transformers.git
```

### 2. Open the Project

Navigate to the project directory and open the `index.html` file in your preferred web browser.

### 3. Insert Your YouTube API Key

For the YouTube comment sentiment analysis to work, you need to insert your YouTube API key in the JavaScript file.

Create `key.js` and create the following line:

```javascript
const apiKey = "YOUR_YOUTUBE_API_KEY";
```

## Usage

### Image Analysis

1. Click on the "Upload Image" button.
2. Select an image file from your device.
3. Click "Analyze Image" to get the analysis results.

### Text Sentiment Analysis

1. Enter the text you want to analyze in the provided text box.
2. Click "Send" to get the sentiment analysis.

### YouTube Comment Sentiment Analysis

1. Enter the URL of the YouTube video whose comments you want to analyze.
2. Click "Analyze " to get the sentiment analysis of the comments.

## Technologies Used

- **HTML**
- **CSS**
- **JavaScript**

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

If you have any questions or suggestions, feel free to contact me at [your-email@example.com](mailto:your-email@example.com).

## Acknowledgements

Xenova
