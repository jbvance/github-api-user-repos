function getReposByHandle(searchTerm) {
  const url = `https://api.github.com/users/${searchTerm}/repos` 
  fetch(url)
    .then(res => {      
      if (res.ok) {        
        return res.json()
      }
      throw new Error(res.statusText);
    })
    .then(resJson => {
      displayRepos(resJson)
    })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayRepos(repos) {
  let strHtml = '';
  $('#results-list').empty();
  for (let i = 0; i < repos.length; i++) {    
    $('#results-list').append(
      `<li>
        <h3>
          <a href="${repos[i].html_url}">${repos[i].name}</a>
        </h3>     
      </li>`
    )
  };
  //display the results section  
  $('#results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-handle').val();
    // Reset error message and hide search results
    $('#js-error-message').empty();
    $('#results').addClass('hidden');

    getReposByHandle(searchTerm)
  });
}

$(watchForm);