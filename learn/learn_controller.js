import { collection, doc, setDoc, getDoc, getDocs, getFirestore, query, orderBy, deleteDoc } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";
import { getAuth, EmailAuthProvider, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
const db = getFirestore();
const auth = getAuth();

onAuthStateChanged(auth, (userDetails) => {
    if (userDetails) {
        globalThis.uid = userDetails.uid
    } else {
        //user is signed out
        swal ({
            title: "Log Out",
            text: "Successfully logged out! You will be redirected to the login page.",
            icon: "info",
            closeOnClickOutside: false,
        })
        .then(function() {
            window.location.href = '../auth/login.html'
        })
    }
})

const q = query(collection(db, "posts"), orderBy("time"));
const querySnapshot = await getDocs(q);
querySnapshot.forEach( async (snap) => {
    const post = snap.data();

    const postID = snap.id;

    const posterID = post.posterID;
    const docRef = doc(db, "users", posterID);
    const docSnap = await getDoc(docRef);
    const posterName = docSnap.data().name;

    const title = post.title;
    const tags = post.tags;

    const posts = document.getElementById("posts");

    // Create the post
    const postTitle = document.createElement('h5');
    postTitle.className = "card-title fw-400 my-0"
    postTitle.innerText = `${posterName}`;

    const postTime = document.createElement('div')
    postTime.className = "card-text"
    var storeTime = `<small class="text-muted">Posted on ${post.dateStr}</small>`
    postTime.innerHTML = storeTime

    const postDesc = document.createElement('h4');
    postDesc.className = "card-subtitle my-3"
    postDesc.innerText = `${title}`;

    const postTags = document.createElement('div');
    postTags.className = "card-text my-1";
    var tagOutput = ""
    for (var tag of tags) {
        tagOutput += `#${tag} `
    }
    postTags.innerText = tagOutput;

    const postBtn = document.createElement('a');
    postBtn.className = "btn btn-outline-primary m-1"
    postBtn.style = "font-size: 12px;"
    postBtn.addEventListener('click', () => {
        setPostId(postID)
    })
    postBtn.innerText = "View Post";

    const postContents = document.createElement('div');
    postContents.className = "card-text";
    postContents.appendChild(postBtn)

    if (uid == post.posterID) {
        const deleteBtn = document.createElement('a');
        deleteBtn.className = "btn btn-outline-danger m-1"
        deleteBtn.style = "font-size: 12px;"
        deleteBtn.addEventListener('click', () => {
            deletePost(postID)
        })
        deleteBtn.innerText = "Delete Post";
        postContents.appendChild(deleteBtn)
    }

    const cardBody = document.createElement('div');
    cardBody.className = "card-body";
    cardBody.appendChild(postTitle)
    cardBody.appendChild(postTime)
    cardBody.appendChild(postDesc)
    cardBody.appendChild(postTags)
    cardBody.appendChild(postContents)

    const cardMain = document.createElement('div');
    cardMain.className = "card";
    cardMain.appendChild(cardBody)

    const mainElm = document.createElement('div');
    mainElm.className = "col-md-6 col-lg-4 my-1";
    mainElm.appendChild(cardMain)
    mainElm.setAttribute('data-aos', 'zoom-in')

    document.getElementById('spinner').style.display = 'none'
    posts.appendChild(mainElm)
})

function setPostId (string) {
    window.location.href = `view_post.html?post=${string}`
}

function deletePost (postID) {
    swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((isOkay) => {
        if (isOkay) {
            swal({
                title: 'Deleted!',
                text: "Please wait a few seconds for the page to reload",
                icon: 'success'
            }).then(async function () {
                await deleteDoc(doc(db, "posts", postID)).
                then(function () {
                    window.location.reload()
                });
            })
        }
    });
}
var loading = false
document.getElementById('searchBtn').addEventListener('click', async (e) => {
    document.getElementById('posts').innerHTML = `
    <div class="w-100 center my-5" id='spinner'>
        <div class="spinner-border" role="status">
            <span class="sr-only"></span>
        </div>
    </div>
    `
    var searchInput = document.getElementById('searchBar').value.trim().toLowerCase()
    if (!loading && searchInput.length != 0) {
        loading = true;
        var searchResults = []
        document.getElementById('spinner').style.display = ''

        const q = query(collection(db, "posts"), orderBy("time"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach( async (snap) => {

            const post = snap.data();
            const postID = snap.id;
            if (post.tags.includes(searchInput)) {
                searchResults.push({'post': post, 'postID': postID})
            }
        })

        if (searchResults.length != 0) {
            for (var i=0;i<searchResults.length;i++) {
                const post = searchResults[i].post;
            
                const postID = searchResults[i].postID;
            
                const posterID = post.posterID;
                const docRef = doc(db, "users", posterID);
                const docSnap = await getDoc(docRef);
                const posterName = docSnap.data().name;
            
                const title = post.title;
                const tags = post.tags
            
                const posts = document.getElementById("posts");
            
                // Create the post
                const postTitle = document.createElement('h5');
                postTitle.className = "card-title fw-400 my-0"
                postTitle.innerText = `${posterName}`;
            
                const postTime = document.createElement('div')
                postTime.className = "card-text"
                var storeTime = `<small class="text-muted">Posted on ${post.dateStr}</small>`
                postTime.innerHTML = storeTime
            
                const postDesc = document.createElement('h4');
                postDesc.className = "card-subtitle my-3"
                postDesc.innerText = `${title}`;

                const postTags = document.createElement('div');
                postTags.className = "card-text my-1";
                var tagOutput = ""
                for (var tag of tags) {
                    tagOutput += `#${tag} `
                }
                postTags.innerText = tagOutput;
            
                const postBtn = document.createElement('a');
                postBtn.className = "btn btn-outline-primary m-1"
                postBtn.id = `viewAPost=${postID}`
                postBtn.style = "font-size: 12px;"
                postBtn.innerText = "View Post";
            
                const postContents = document.createElement('div');
                postContents.className = "card-text";
                postContents.appendChild(postBtn)
            
                if (uid == post.posterID) {
                    const deleteBtn = document.createElement('a');
                    deleteBtn.className = "btn btn-outline-danger m-1"
                    deleteBtn.style = "font-size: 12px;"
                    deleteBtn.addEventListener('click', () => {
                        deletePost(postID)
                    })
                    deleteBtn.innerText = "Delete Post";
                    postContents.appendChild(deleteBtn)
                }
            
                const cardBody = document.createElement('div');
                cardBody.className = "card-body";
                cardBody.appendChild(postTitle)
                cardBody.appendChild(postTime)
                cardBody.appendChild(postDesc)
                cardBody.appendChild(postTags)
                cardBody.appendChild(postContents)
            
                const cardMain = document.createElement('div');
                cardMain.className = "card";
                cardMain.appendChild(cardBody)
            
                const mainElm = document.createElement('div');
                mainElm.className = "col-md-6 col-lg-4 my-1 userPost";
                mainElm.appendChild(cardMain)
                mainElm.setAttribute('data-aos', 'zoom-in')
            
                document.getElementById('spinner').style.display = 'none'
                posts.appendChild(mainElm)
            }

            document.getElementById('posts').innerHTML = `
            <div onclick='window.location.reload()' class='text-secondary' style='margin-bottom:10px; margin-left: 5px;' data-aos='fade-right'>Clear search?</div>
            ` + document.getElementById('posts').innerHTML
            
        } else {
            document.getElementById('spinner').style.display = 'none'
            document.getElementById('posts').innerHTML = `
            <div class='w-100 text-center text-secondary center' style='height: 200px'>No results found. Try searching a different keyword or&nbsp<a onclick='window.location.reload()' href='#'>clear search</a>!</div>
            `
            
        }
        loading = false
    }
})

document.querySelector('body').addEventListener('click', function(event) {
    if (event.target.id.indexOf('viewAPost') != -1) {
        var id = (event.target.id.split('='))[1]
        setPostId(id)
    }
});