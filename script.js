"use strict";

const apiKey = "4lKfC5WjSSfTISoc8Svlm4PJmQTU1fteKMUypSku";

const searchURL = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

function displayResults(responseJson) {
  console.log(responseJson);

  $("#results-list").empty();

  for (let i = 0; i < responseJson.data.length; i++) {
    $("#results-list").append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href='${responseJson.data[i].url}'>Link to Site</a>
      </li>`
    );
  }

  $("#results").removeClass("hidden");
}

function getYouTubeVideos(query, limit = 50) {
  const params = {
    api_key: apiKey,
    q: query,
    limit
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + "?" + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const searchTerm = $("#js-search-term").val();
    const maxResults = $("#limit").val();
    getYouTubeVideos(searchTerm, maxResults);
  });
}

$(watchForm);
