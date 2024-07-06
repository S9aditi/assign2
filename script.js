


// document.addEventListener('DOMContentLoaded', async function () {
//   const barCtx = document.getElementById('barChart').getContext('2d');
//   const lineCtx = document.getElementById('lineChart').getContext('2d');
//   const pieCtx = document.getElementById('pieChart').getContext('2d');
//   const scatterCtx = document.getElementById('scatterPlot').getContext('2d');
//   let barChart, lineChart, pieChart, scatterChart;
//   let tracksData = [];

//   const clientId = '6df35adad2b6400792736a553e61b71c';
//   const clientSecret = '8ce26fc583d44152ba30cfa28d94b270';


//   async function getAccessToken() {
//       const response = await fetch('https://accounts.spotify.com/api/token', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/x-www-form-urlencoded',
//               'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
//           },
//           body: 'grant_type=client_credentials'
//       });

//       const data = await response.json();
//       return data.access_token;
//   }

//   async function fetchBollywoodTracks(accessToken) {
//       let allTracks = [];
//       let limit = 50;
//       let offset = 0;
//       let total = 0;

//       do {
//           const response = await fetch(`https://api.spotify.com/v1/search?q=year:2023%20genre:bollywood&type=track&market=IN&limit=${limit}&offset=${offset}`, {
//               headers: {
//                   'Authorization': 'Bearer ' + accessToken
//               }
//           });

//           if (!response.ok) {
//               throw new Error(`Spotify API error: ${response.statusText}`);
//           }

//           const data = await response.json();
//           const tracks = data.tracks.items.filter(track => {
//               const releaseYear = new Date(track.album.release_date).getFullYear();
//               return releaseYear === 2023;
//           });

//           total = data.tracks.total;
//           allTracks = allTracks.concat(tracks);
//           offset += limit;
//       } while (offset < 1000);

//       console.log('Fetched Tracks:', allTracks);
//       return allTracks;
//   }

//   function updateCharts(filteredTracks) {
//       const labels = filteredTracks.slice(0, 20).map(track => track.name);
//       const popularityData = filteredTracks.slice(0, 20).map(track => track.popularity);
//       const durationData = filteredTracks.slice(0, 20).map(track => track.duration_ms / 1000);

//       updateBarChart(labels, popularityData);
//       updateLineChart(labels, durationData);
//       updatePieChart(labels, popularityData);
//       updateScatterChart(filteredTracks.slice(0, 20));
//   }

//   function updateBarChart(labels, popularityData) {
//       if (barChart) {
//           barChart.destroy();
//       }
//       barChart = new Chart(barCtx, {
//           type: 'bar',
//           data: {
//               labels: labels,
//               datasets: [{
//                   label: 'Popularity',
//                   data: popularityData,
//                   backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                   borderColor: 'rgba(54, 162, 235, 1)',
//                   borderWidth: 1
//               }]
//           },
//           options: {
//               scales: {
//                   y: {
//                       beginAtZero: true
//                   }
//               }
//           }
//       });
//   }

//   function updateLineChart(labels, durationData) {
//       if (lineChart) {
//           lineChart.destroy();
//       }
//       lineChart = new Chart(lineCtx, {
//           type: 'line',
//           data: {
//               labels: labels,
//               datasets: [{
//                   label: 'Duration (seconds)',
//                   data: durationData,
//                   backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                   borderColor: 'rgba(75, 192, 192, 1)',
//                   borderWidth: 1
//               }]
//           },
//           options: {
//               scales: {
//                   y: {
//                       beginAtZero: true
//                   }
//               }
//           }
//       });
//   }

//   function updatePieChart(labels, popularityData) {
//       if (pieChart) {
//           pieChart.destroy();
//       }
//       pieChart = new Chart(pieCtx, {
//           type: 'pie',
//           data: {
//               labels: labels,
//               datasets: [{
//                   label: 'Popularity',
//                   data: popularityData,
//                   backgroundColor: [
//                       'rgba(255, 99, 132, 0.2)',
//                       'rgba(54, 162, 235, 0.2)',
//                       'rgba(255, 206, 86, 0.2)',
//                       'rgba(75, 192, 192, 0.2)',
//                       'rgba(153, 102, 255, 0.2)',
//                       'rgba(255, 159, 64, 0.2)',
//                       'rgba(255, 99, 132, 0.2)',
//                       'rgba(54, 162, 235, 0.2)',
//                       'rgba(255, 206, 86, 0.2)',
//                       'rgba(75, 192, 192, 0.2)'
//                   ],
//                   borderColor: [
//                       'rgba(255, 99, 132, 1)',
//                       'rgba(54, 162, 235, 1)',
//                       'rgba(255, 206, 86, 1)',
//                       'rgba(75, 192, 192, 1)',
//                       'rgba(153, 102, 255, 1)',
//                       'rgba(255, 159, 64, 1)',
//                       'rgba(255, 99, 132, 1)',
//                       'rgba(54, 162, 235, 1)',
//                       'rgba(255, 206, 86, 1)',
//                       'rgba(75, 192, 192, 1)'
//                   ],
//                   borderWidth: 1
//               }]
//           }
//       });
//   }

//   function updateScatterChart(tracks) {
//       if (scatterChart) {
//           scatterChart.destroy();
//       }
//       const scatterData = tracks.map(track => ({
//           x: track.popularity,
//           y: track.duration_ms / 1000,
//           label: track.name
//       }));

//       scatterChart = new Chart(scatterCtx, {
//           type: 'scatter',
//           data: {
//               datasets: [{
//                   label: 'Popularity vs Duration',
//                   data: scatterData,
//                   backgroundColor: 'rgba(255, 159, 64, 0.2)',
//                   borderColor: 'rgba(255, 159, 64, 1)',
//                   borderWidth: 1
//               }]
//           },
//           options: {
//               scales: {
//                   x: {
//                       beginAtZero: true,
//                       title: {
//                           display: true,
//                           text: 'Popularity'
//                       }
//                   },
//                   y: {
//                       beginAtZero: true,
//                       title: {
//                           display: true,
//                           text: 'Duration (seconds)'
//                       }
//                   }
//               }
//           }
//       });
//   }

//   async function main() {
//       const accessToken = await getAccessToken();
//       tracksData = await fetchBollywoodTracks(accessToken);

//       document.getElementById('filterInput').addEventListener('input', function () {
//           const filterValue = this.value.toLowerCase();
//           const filteredTracks = tracksData.filter(track => track.name.toLowerCase().includes(filterValue));
//           updateCharts(filteredTracks);
//       });

//       updateCharts(tracksData);
//   }

//   main();
// });


// Assuming tracksData contains fetched Spotify tracks data

document.addEventListener('DOMContentLoaded', async function () {
  const barCtx = document.getElementById('barChart').getContext('2d');
  const lineCtx = document.getElementById('lineChart').getContext('2d');
  const pieCtx = document.getElementById('pieChart').getContext('2d');
  const scatterCtx = document.getElementById('scatterPlot').getContext('2d');
  const artistPopularityCtx = document.getElementById('artistPopularityChart').getContext('2d'); // Added artistPopularityCtx

  let barChart, lineChart, pieChart, scatterChart,artistPopularityChart;
  let tracksData = [];

  const clientId = '6df35adad2b6400792736a553e61b71c';
  const clientSecret = '8ce26fc583d44152ba30cfa28d94b270';

  async function getAccessToken() {
      const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
          },
          body: 'grant_type=client_credentials'
      });

      const data = await response.json();
      return data.access_token;
  }

  async function fetchBollywoodTracks(accessToken) {
      let allTracks = [];
      let limit = 50;
      let offset = 0;
      let total = 0;

      do {
          const response = await fetch(`https://api.spotify.com/v1/search?q=year:2023%20genre:bollywood&type=track&market=IN&limit=${limit}&offset=${offset}`, {
              headers: {
                  'Authorization': 'Bearer ' + accessToken
              }
          });

          if (!response.ok) {
              throw new Error(`Spotify API error: ${response.statusText}`);
          }

          const data = await response.json();
          const tracks = data.tracks.items.filter(track => {
              const releaseYear = new Date(track.album.release_date).getFullYear();
              return releaseYear === 2023;
          });

          total = data.tracks.total;
          allTracks = allTracks.concat(tracks);
          offset += limit;
      } while (offset < 1000);

      console.log('Fetched Tracks:', allTracks);
      return allTracks;
  }

  function updateCharts(filteredTracks) {
      const labels = filteredTracks.slice(0, 20).map(track => track.name);
      const popularityData = filteredTracks.slice(0, 20).map(track => track.popularity);
      const durationData = filteredTracks.slice(0, 20).map(track => track.duration_ms / 1000);

      updateBarChart(labels, popularityData);
      updateLineChart(labels, durationData);
      updatePieChart(labels, popularityData);
      updateScatterChart(filteredTracks.slice(0, 20));
      updateArtistPopularityChart(filteredTracks); // New addition to update artist popularity chart
  }

  function updateBarChart(labels, popularityData) {
      if (barChart) {
          barChart.destroy();
      }
      barChart = new Chart(barCtx, {
          type: 'bar',
          data: {
              labels: labels,
              datasets: [{
                  label: 'Popularity',
                  data: popularityData,
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
  }

  function updateLineChart(labels, durationData) {
      if (lineChart) {
          lineChart.destroy();
      }
      lineChart = new Chart(lineCtx, {
          type: 'line',
          data: {
              labels: labels,
              datasets: [{
                  label: 'Duration (seconds)',
                  data: durationData,
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
  }

  function updatePieChart(labels, popularityData) {
      if (pieChart) {
          pieChart.destroy();
      }
      pieChart = new Chart(pieCtx, {
          type: 'pie',
          data: {
              labels: labels,
              datasets: [{
                  label: 'Popularity',
                  data: popularityData,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)'
                  ],
                  borderWidth: 1
              }]
          }
      });
  }

  function updateScatterChart(tracks) {
      if (scatterChart) {
          scatterChart.destroy();
      }
      const scatterData = tracks.map(track => ({
          x: track.popularity,
          y: track.duration_ms / 1000,
          label: track.name
      }));

      scatterChart = new Chart(scatterCtx, {
          type: 'scatter',
          data: {
              datasets: [{
                  label: 'Popularity vs Duration',
                  data: scatterData,
                  backgroundColor: 'rgba(255, 159, 64, 0.2)',
                  borderColor: 'rgba(255, 159, 64, 1)',
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  x: {
                      beginAtZero: true,
                      title: {
                          display: true,
                          text: 'Popularity'
                      }
                  },
                  y: {
                      beginAtZero: true,
                      title: {
                          display: true,
                          text: 'Duration (seconds)'
                      }
                  }
              }
          }
      });
  }

  function updateArtistPopularityChart(filteredTracks) {
      // Aggregate data by artist
      const artistData = {};
      filteredTracks.forEach(track => {
          const artist = track.artists[0].name; // Assuming first artist is used for simplicity
          if (!artistData[artist]) {
              artistData[artist] = {
                  popularitySum: 0,
                  count: 0
              };
          }
          artistData[artist].popularitySum += track.popularity;
          artistData[artist].count++;
      });

      // Prepare data for chart
      const labels = Object.keys(artistData);
      const popularityData = labels.map(artist => artistData[artist].popularitySum / artistData[artist].count);

      // Update or create the chart
      updateArtistPopularityBarChart(labels, popularityData);
  }

  function updateArtistPopularityBarChart(labels, popularityData) {
      if (artistPopularityChart) {
          artistPopularityChart.destroy();
      }

      const ctx = document.getElementById('artistPopularityChart').getContext('2d');
      artistPopularityChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: labels,
              datasets: [{
                  label: 'Artist Popularity',
                  data: popularityData,
                  backgroundColor: 'rgba(54, 162, 235, 0.6)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
  }

  async function main() {
      const accessToken = await getAccessToken();
      tracksData = await fetchBollywoodTracks(accessToken);

      document.getElementById('filterInput').addEventListener('input', function () {
          const filterValue = this.value.toLowerCase();
          const filteredTracks = tracksData.filter(track => track.name.toLowerCase().includes(filterValue));
          updateCharts(filteredTracks);
      });

      updateCharts(tracksData);
  }

  main();
});

