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

var querySnapshot = [] 

const q = query(collection(db, `posts/${postID}/comments`), orderBy("time"));
querySnapshot = await getDocs(q);

if (querySnapshot.size == 0) {
    document.getElementById("comments").innerHTML = `
    <div class='text-center my-3'>Be the first to comment!</div>
    `
} else {
    document.getElementById("comments").innerHTML = ""
}

querySnapshot.forEach( async (snap) => {
    const post = snap.data();

    const posterID = post.posterID;
    const docRef = doc(db, "users", posterID);
    const docSnap = await getDoc(docRef);
    const posterName = docSnap.data().name;

    const comment = post.comment;

    // Create the post
    const commentorName = document.createElement('div');
    commentorName.className = "card-title m-0 p-0"
    commentorName.innerText = `${posterName}`;

    const commentTime = document.createElement('div')
    commentTime.className = "card-text"
    var storeTime = `<small class="text-muted">Posted on ${post.dateStr}</small>`
    commentTime.innerHTML = storeTime

    const commentText = document.createElement('h6');
    commentText.className = "card-subtitle mt-3"
    commentText.innerText = `${comment}`;

    const cardBody = document.createElement('div');
    cardBody.className = "card-body";
    cardBody.appendChild(commentorName)
    cardBody.appendChild(commentTime)
    cardBody.appendChild(commentText)

    const cardMain = document.createElement('div');
    cardMain.className = "card my-1";
    cardMain.style = "border: 1px solid grey";
    cardMain.appendChild(cardBody)
    cardMain.setAttribute('data-aos', 'zoom-in')

    const comments = document.getElementById("comments");
    comments.appendChild(cardMain)
})