<!--
	/*
	 * index.php - The main page where everything happens
	 * © Copyright 2023 Valerie Pond and the DalekIRC Team
	 * 
	 * This program is free software; you can redistribute it and/or modify
	 * it under the terms of the GNU General Public License as published by
	 * the Free Software Foundation; either version 3, or (at your option)
	 * any later version.
	 *
	 * This program is distributed in the hope that it will be useful,
	 * but WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	See the
	 * GNU General Public License for more details.
	 *
	 * You should have received a copy of the GNU General Public License
	 * along with this program; if not, write to the Free Software
	 * Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
	 */
	-->
<!doctype html>
<?php //require_once("php/main.php"); ?>
<html style="height:88%;width:100%;" class="bg-dark" lang="en">
	<head>
		<meta charset="utf-8">
		<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js" integrity="sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
		<link href="css/client.css" rel="stylesheet">
		<link href="css/themes.css" rel="stylesheet">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
		<title>Chat Shit</title>
	</head>
	<body style="height:100%;width:100%;">
		<nav class="navbar border-bottom bg-dark" data-bs-theme="dark">
			<div class="container-fluid">
				<h2><img src="/wp-content/uploads/2024/08/poop-emoji-png-42528.png" width="36px" class="rounded" height="36px"><span class="badge ps-3 pe-3" style="font-weight:600"></span></h2>
				<div>
					<!-- Button to open the modal -->
					<button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#imageModal">
					<i class="fa-solid fa-image text-white"></i>
					</button>
					<!--button type="button" class="text-right btn btn-secondary" data-bs-toggle="modal" data-bs-target="#serverSettings">Settings</button-->
					<!--input type="submit" name="submit" class="btn btn-success" id="submit" value="Connect" onclick="connectWebSocket();"/-->
				</div>
			</div>
		</nav>
		<div class="container">
			<div class="row">
				<div class="col">
					<div id="treebar"></div>
				</div>
				<div class="col">
					<div id="chatwindow" class="pb-4">
						<div id="topic" class="topic"></div>
						<div id="output" class="output bg-nihao"></div>
						<div id="typing" class="typing"><strong><i>Nobody is typing</i></strong></div>
					</div>
					
				</div>
					<div id="nicklistwindow" class="bg-dark col" style="padding:2px;">
				</div>
			</div>
			<footer class="footer mt-auto mb-auto py-3 bg-dark align-items-center input-group mr-2 ml-2 pt-2">
					
				<input type="file" id="file-input" name="file" style="display:none;" accept="image/jpeg, image/png, image/webp, image/bmp">

				<div type="button" id="upload-button" class="ms-2 text-middle text-center input-group-item btn btn-sm rounded-pill btn-success flex pe-2"
				style="min-width:30px;max-width:150px;">+</div>

				<input type="text" class="rounded me-2 ms-2 shadow-none bg-nihao form-control text-white"
				placeholder="Send a message..." style="position:sticky; color:#5A5A5A;background-color:#5A5A5A"
				name="input" id="input" aria-label="Text to send">
				<span class="btn btn-success rounded me-2" style="min-width:100px;width:10%" name="submit" id="submit_msg"
				onclick="send();" id="send-btn">Send</span>
				<br>
			</footer>
		</div>
	</body>
</html>
<!-- Emoji Grid Modal -->
<div class="modal fade" id="emojiModal" tabindex="-1" aria-labelledby="emojiModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content bg-dark text-white">
			<div class="modal-body">
				<div class="container">
					<div class="row text-center">
						<!-- Emoji Grid -->
						<div class="col-2 select-react">😀</div>
						<div class="col-2 select-react">😁</div>
						<div class="col-2 select-react">😂</div>
						<div class="col-2 select-react">😍</div>
						<div class="col-2 select-react">🥳</div>
						<div class="col-2 select-react">😎</div>

						<div class="col-2 select-react">😆</div>
						<div class="col-2 select-react">🤔</div>
						<div class="col-2 select-react">😇</div>
						<div class="col-2 select-react">😜</div>
						<div class="col-2 select-react">🤗</div>
						<div class="col-2 select-react">🥰</div>

						<div class="col-2 select-react">😅</div>
						<div class="col-2 select-react">🙃</div>
						<div class="col-2 select-react">🤩</div>
						<div class="col-2 select-react">🤨</div>
						<div class="col-2 select-react">😔</div>
						<div class="col-2 select-react">🤯</div>

						<div class="col-2 select-react">👍</div>
						<div class="col-2 select-react">👏</div>
						<div class="col-2 select-react">👋</div>
						<div class="col-2 select-react">🤙</div>
						<div class="col-2 select-react">👌</div>
						<div class="col-2 select-react">✌️</div>

						<div class="col-2 select-react">❤️</div>
						<div class="col-2 select-react">💔</div>
						<div class="col-2 select-react">💕</div>
						<div class="col-2 select-react">💖</div>
						<div class="col-2 select-react">💙</div>
						<div class="col-2 select-react">💜</div>

						<div class="col-2 select-react">🎉</div>
						<div class="col-2 select-react">🎂</div>
						<div class="col-2 select-react">🎁</div>
						<div class="col-2 select-react">🎈</div>
						<div class="col-2 select-react">🥂</div>
						<div class="col-2 select-react">🍻</div>

						<div class="col-2 select-react">🔥</div>
						<div class="col-2 select-react">✨</div>
						<div class="col-2 select-react">⭐</div>
						<div class="col-2 select-react">🌈</div>
						<div class="col-2 select-react">⚡</div>
						<div class="col-2 select-react">🌟</div>

						<div class="col-2 select-react">💡</div>
						<div class="col-2 select-react">📅</div>
						<div class="col-2 select-react">📞</div>
						<div class="col-2 select-react">💻</div>
						<div class="col-2 select-react">📱</div>
						<div class="col-2 select-react">🕹️</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="profileModal" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content bg-dark text-white">
      
      <div class="modal-body">
		<div id="profile-view-theme" class="nicklist-theme profile-view-theme"></div>
		<div id="profile-avatar-view" class="profile-avatar-view"></div>
		<div class="row" scope="row">
			<h3 id="profile-view-nick" class="profile-view-nick"></h3>
			<h3 id="profile-view-geo" class="profile-view-geo"></h3>
		</div>
		<div class="profile-view-channels">
			<h6>Channels:</h6>
			<div id="profile-view-channels"></div>
		</div>
		<hr>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary"  data-bs-dismiss="modal" onclick="visitProfile()">Visit Profile</button>
      </div>
    </div>
  </div>
</div>


<!-- Modal -->
<div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content bg-dark text-white">
      <div class="modal-header text-center">
        <h5 class="modal-title" id="imageModalLabel">Image Gallery</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div id="image-gallery" class="row">
          <!-- Images will be dynamically inserted here -->
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<div draggable="true" class="card options-card" hidden="true" id="options-options">
	<div class="row gx-0" scope="row">
		<button class="col btn btn-dark" onclick="document.getElementById('file-input').click();document.getElementById('options-options').hidden = true"><i class="fa-solid fa-arrow-up-from-bracket"></i><br><small>Upload a Photo</small></but>
		<button class="col btn btn-dark"><i class="fa-solid fa-square-poll-vertical"></i><br><small>Create a Poll</small></button>
	</div>
</div>

<script>
$(document).ready(function () {
  // Function to fetch and display images in the modal
  function loadImages() {
    $.ajax({
      url: '/wp-json/unrealircd/v1/images',
      method: 'GET',
      success: function (data) {
        $('#image-gallery').empty(); // Clear previous images
        if (data.length > 0) {
          data.forEach(function (image) {
            $('#image-gallery').append(`
              <div class="col-md-4 position-relative image-item">
                <a href="${image.url}" target="_blank"><img src="${image.url}" alt="${image.file}" class="img-fluid img-thumbnail" /></a>
				<span class="image-options row" scope="row">
					<a style="padding:0" href="${image.url}" download="${image.file}">
						<span class="download-icon badge rounded-pill text-bg-secondary" data-filename="${image.file}"><i class="fa-solid fa-download"></i></i></span>
					</a>
					<span class="clipboard-icon badge rounded-pill text-bg-secondary" data-filename="${image.url}" onclick='copyToClipboard("${image.url}")'><i class="fa-solid fa-clipboard"></i></span>
					<span class="delete-icon badge rounded-pill text-bg-secondary" data-filename="${image.file}"><i class="fa-solid fa-trash"></i></span>
				</span>
              </div>
            `);
          });
        } else {
          $('#image-gallery').append('<p>No images found.</p>');
        }
      },
      error: function () {
        alert('Failed to load images.');
      }
    });
  }



  // Load images when the modal is opened
  $('#imageModal').on('show.bs.modal', function () {
    loadImages();
  });

  // Handle image deletion
  $(document).on('click', '.delete-icon', function () {
    const filename = $(this).data('filename');
    const confirmed = confirm(`Are you sure you want to delete ${filename}?`);
    
    if (confirmed) {
      $.ajax({
        url: '/wp-json/unrealircd/v1/delete-image',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ filename: filename }),
        success: function () {
          loadImages(); // Reload images after deletion
        },
        error: function () {
          alert('Failed to delete image.');
        }
      });
    }
  });
});
</script>

<!-- CSS for styling the delete icon -->
<style>
.image-item {
  margin-bottom: 20px;
  position: relative;
}

.download-icon {
	width:34px;
}
.clipboard-icon {
	width:34px;
}
.delete-icon {
	width:34px;
}

.image-options {
  position: absolute;
  top: -5px;
  right: 12px;
  font-size: 20px;
  overflow: hidden;
  cursor: pointer;
  display: none;
}

.image-item:hover .image-options {
  display: block;
}
</style>


<?php require_once("php/include.php"); ?>
<script>
const input = document.getElementById("input");

input.addEventListener('keydown', e => {
	if (e.keyCode == 13)
		send();
});
	
document.getElementById('upload-button').addEventListener('click', function() {
    // Trigger the file input click
	let options = document.getElementById('options-options');
	options.hidden = !options.hidden;
});

// When the file input changes (a file is selected), automatically upload
document.getElementById('file-input').addEventListener('change', function() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (!file) {
        alert('No file selected.');
        return;
    }

    // Ensure file is less than 2KB
    if (file.size > 12097152) {
        alert('The file exceeds the size limit of 2MB.');
        return;
    }
		
	// Ensure the file is a still image (allowing JPEG, PNG, etc., but no GIF)
	const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp'];
    if (!allowedMimeTypes.includes(file.type)) {
        alert('Only still image formats (JPEG, PNG, etc.) are allowed. No GIFs.');
        return;
    }
    const formData = new FormData();
    formData.append('file', file);

    // Make the AJAX request to the WordPress REST API
    fetch('/wp-json/unrealircd/v1/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const statusElement = document.getElementById('upload-status');
        const fileUrlElement = document.getElementById('file-url');

        if (data.file_url) {
			doSend(`PRIVMSG ${me.active_window} :${data.file_url}`)
			console.error(`Success: ${data.file_url}`);
        } else if (data.message) {
			console.error(`ERROR: ${data.message}`);
        } else {
        }
    })
    .catch(error => {
        console.error('Error uploading file:', error);
    });
});

const reactsList = document.querySelectorAll('.select-react');
Array.from(reactsList).forEach((react) => {
	react.setAttribute('data-bs-dismiss', 'modal');
	react.addEventListener('click', (e) => {
		let emoji = react.innerText;
		if (!me.toReactTo)
			return console.error("No react target");

		let mtags = new MessageTags();
		mtags.add('+draft/react', emoji);
		mtags.add('+draft/reply', me.toReactTo);
		send_to(me.active_window, mtags);
		me.toReactTo = null;
	})
});
</script>