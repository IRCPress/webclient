
const inputbox = document.getElementById("input");

/**
 * 
 */
inputbox.addEventListener('input', event => {
	if (event.target.value[0] == "/" && !event.target.value.includes(" "))
	{
		let text = event.target.value;
		if (text.length == 1)
		{
			/** */
		}
	}
});
inputbox.addEventListener('keydown', function(event) {
	if (event.key === "Tab") {
	  // Prevent the default action of the Tab key press
	  event.preventDefault();
	}
  });