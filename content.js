
var isHovered = false;
var global;
const imgs = document.getElementsByTagName('img');

const map = fn => x => Array.prototype.map.call(x, fn);

map(img => {
  img.addEventListener('mouseover', (e) => {
    var a = e.target.closest("a");
    if (a && a.getAttribute('href')) {

      global = e.target.closest("a").getAttribute('href');
      console.log(global)
    } else {
      global = e.target.src;
      console.log(global)
    }
    hoveredBox();
  });
  img.addEventListener('mouseleave', (e) => {
    isHovered = false;
  });


})(imgs)


document.addEventListener('keypress', keyDown);

function hoveredBox() {
  isHovered = true;
}

function keyDown(event) {
  if (!isHovered) return;
  var key = event.keyCode;
  if (key === 115) {
    saveFile(global);
  }

}


// Download a file form a url.
function saveFile(url) {
  // Get file name from url.
 	filename=url;
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function() {
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
	// alert('asdf');  
    a.download = filename; // Set the file name.
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    delete a;
  };

  xhr.open('GET', url);
  xhr.send();
}

