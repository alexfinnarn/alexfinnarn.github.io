
fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40alexfinnarn').then(function(response) {
  console.log(response);
  if (response.status === 200) {
    document.getElementById('medium-container').setAttribute('style', 'display:block');
    response.text().then(function(text) {
        var feed = JSON.parse(text);
        console.log(feed.items[0]);
        var post = feed.items[0];
        document.getElementById('post-title').innerHTML = '<a href="' + post.link + '">' + post.title + '</a>';
        document.getElementById('post-description').innerHTML = post.description;
    });
  }
});
