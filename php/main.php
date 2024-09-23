<!doctype html>
<?php
require_once("html.php");

$html = new HTMLElement("html", NULL, NULL, NULL, ["bg-dark"]);
$html->setAttribute("style", "height:88%;width:100%;");
$html->setAttribute("lang", "en");
	$head = $html->spawnChild("head");
		$meta = $head->spawnChild("meta");
		$meta->setAttribute("utf-8");
		$script = $head->spawnChild("script");
		$script->setAttribute("src", "https://code.jquery.com/jquery-3.6.0.min.js");
		$script2 = $head->spawnChild("script");
		$script2->setAttribute(["src", "integrity", "crossorigin"], 
		[   "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js",
			"sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r",
			"anonymous"
		]);

		// now we're adding children for speed...
		$script3 = $script2;
		$script3->setAttribute(["src", "integrity", "crossorigin"],
		[   "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js",
			"sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS",
			"anonymous"
		]);
		$head->addChild($script3);
		$script4 = $script3;
		$script4->setAttribute(["src", "integrity", "crossorigin"],
		[   "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js",
			"sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS",
			"anonymous"
		]);
		$head->addChild($script4);

		echo $html;


?>