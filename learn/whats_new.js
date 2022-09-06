import { collection, doc, setDoc, getDoc, getDocs, getFirestore, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";
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

const q = query(collection(db, "posts"), orderBy("time", "desc"), limit(3));
const querySnapshot = await getDocs(q);

querySnapshot.forEach( async (snap) => {
    const post = snap.data();

    const postID = snap.id;

    const posterID = post.posterID;
    const docRef = doc(db, "users", posterID);
    const docSnap = await getDoc(docRef);
    const posterName = docSnap.data().name;

    const title = post.title;

    const recents = document.getElementById("recents");

    // Create the post
    const postTitle = document.createElement('div');
    postTitle.className = "card-title my-0"
    postTitle.innerText = `${posterName}`;

    const postTime = document.createElement('div')
    postTime.className = "card-text"
    var storeTime = `<small class="text-muted">Posted on ${post.dateStr}</small>`
    postTime.innerHTML = storeTime

    const postDesc = document.createElement('h5');
    postDesc.className = "card-subtitle my-3"
    postDesc.innerText = `${title}`;

    const postBtn = document.createElement('a');
    postBtn.className = "btn btn-outline-primary"
    postBtn.style = "font-size: 12px;"
    postBtn.addEventListener('click', () => {
        setPostId(postID)
    })
    postBtn.innerText = "View Post";

    const postContents = document.createElement('div');
    postContents.className = "card-text";
    postContents.appendChild(postBtn)

    const cardBody = document.createElement('div');
    cardBody.className = "card-body";
    cardBody.appendChild(postTitle)
    cardBody.appendChild(postTime)
    cardBody.appendChild(postDesc)
    cardBody.appendChild(postContents)

    const cardMain = document.createElement('div');
    cardMain.className = "card my-3";
    cardMain.setAttribute('data-aos', 'zoom-in')
    cardMain.appendChild(cardBody)
    
    document.getElementById('spinnerNew').style.display = 'none'
    recents.appendChild(cardMain)
})

function setPostId (string) {
    window.location.href = `view_post.html?post=${string}`
}