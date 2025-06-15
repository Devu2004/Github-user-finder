let inp = document.querySelector(".userInp");
let btn = document.querySelector(".Search");
let card = document.querySelector(".card");

function fetchUserProfile(username){
    return fetch(`https://api.github.com/users/${username}`)
        .then(function(response){
            if (!response.ok) {
                throw new Error("User not found");
            }
            return response.json();
        });
}

function fetchRepos(username){
    return fetch(`https://api.github.com/users/${username}/repos`)
        .then(function(response){
            if (!response.ok) {
                throw new Error("Repos not found");
            }
            return response.json();
        });
}

function decorateProfile(details){
    let data = `
    <img src="${details.avatar_url}" alt="Profile Picture" class="w-24 h-24 rounded-full object-cover border-blue-500 border-2">
<div class="flex-1 space-y-2">
    <h2 class="text-2xl font-semibold">${details.name}</h2>
    <p class="text-gray-400 text-sm">
        <a href="https://github.com/${details.login}" target="_blank" class="hover:underline">@${details.login}</a>
    </p>
    <p class="text-sm mt-2 text-gray-300">
        ${details.bio ? details.bio : "Sorry there is no bio..."}
    </p>
    <div class="flex flex-wrap gap-4 mt-4 text-sm text-gray-300">
        <div><span class="font-semibold text-white">Public Repos:</span> ${details.public_repos}</div>
        <div><span class="font-semibold text-white">Followers:</span> ${details.followers}</div>
        <div><span class="font-semibold text-white">Following:</span> ${details.following}</div>
        <div><span class="font-semibold text-white">Location:</span> ${details.location ? details.location : "N/A"}</div>
        <div><span class="font-semibold text-white">Company:</span> ${details.company ? details.company : "N/A"}</div>
        <div>
            <span class="font-semibold text-white">Blog:</span>
            <a href="${details.blog}" class="text-blue-400 hover:underline" target="_blank">${details.blog}</a>
        </div>
    </div>
</div>
`;
    card.innerHTML = data;
}

btn.addEventListener("click", function(){
    let username = inp.value.trim();
    if(username){
        fetchUserProfile(username)
            .then(function(data){
                decorateProfile(data);
            })
            .catch(function(error){
                alert(error.message);  // This will now show correct error (like "User not found")
                card.innerHTML = "";  // Clear card if any old data present
            });
    } else {
        alert("Please enter a valid username");
    }
});
