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

var output = "<h4>Course Content</h4>";
const q = query(collection(db, "courses"), orderBy("order"));
const querySnapshot = await getDocs(q);

querySnapshot.forEach( async (snap) => { 
    const courseID = snap.id;
    const courseInfo = snap.data();

    const name = courseInfo.name;
    const desc = courseInfo.desc;

    if (courseInfo.root) {
        document.getElementById('spinnerContentPg').style.display = 'none'
        output += `<div class='mt-3 fw-bold'>${name}</div>`
    } else {
        output += `<a class='navbarLink' id='${courseID}'>${name}</a>`
    }

    if (courseID == '1-0') {
        document.getElementById('sectionTitle').innerText = `Section 1 - ${name}`
        document.getElementById('sectionDesc').innerText = `Description: ${desc}`
    } else if (courseID == '1-1') {
        document.getElementById('modTitle').innerText = `${name}`
        document.getElementById('modDesc').innerText = `${desc}`
        document.getElementById('spinnerMedia').style.display = 'none'
        document.getElementById('media').innerHTML = `${courseInfo.link}`
    }
})

document.getElementById('contentpg').innerHTML = output

document.querySelectorAll('.navbarLink').forEach( function (contentLink) {
    contentLink.addEventListener('click', async (e) => {
        const id = contentLink.id;

        const numbers = id.split('-')
        numbers[1] = '0'
        const newID = numbers.join('-')
        const docRef = doc(db, "courses", newID);
        const docSnap = await getDoc(docRef);
        const sect = docSnap.data()
        document.getElementById('sectionTitle').innerText = `Section ${numbers[0]} - ${sect.name}`
        document.getElementById('sectionDesc').innerText = `Description: ${sect.desc}`

        const docRef2 = doc(db, "courses", id);
        const docSnap2 = await getDoc(docRef2);
        const mod = docSnap2.data()

        document.getElementById('modTitle').innerText = `${mod.name}`
        document.getElementById('modDesc').innerText = `${mod.desc}`
     
        
        if (mod.type == 'video') {
            document.getElementById('media').innerHTML = `${mod.link}`
        } else {
            document.getElementById('media').innerHTML = `<iframe src="${mod.link}"></iframe>`
        }
    })
})
