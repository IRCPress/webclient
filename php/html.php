<?php
/*
 * html.php: Easily create objects for HTML elements
 * © Copyright 2023 Valerie Pond and the QtPiRC Team
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 */

 /* ~~~~ HTMLElement Output Example ~~~~

A snippet of how the output of how
`HTMLElement` class prints when you
echo the object variable. This
example is of `include.php`. You
can see the full output when you
view the page source in your browser.

<script defer src="js/index.js">
</script>
<script defer src="src/commands/privmsg.js">
</script>
<script defer src="js/commandHandler.js">
</script>
<script defer src="js/misc.js">
</script>
<script defer src="gui/modal.js">
</script>
<script defer src="gui/input.js">
</script>
<script defer src="gui/options.js">
</script>
etc
 
*/

/**
 * HTML Element
 * Lets you easily create HTML short and easily.
 * An example of this usage is `include.php`
 */
class HTMLElement
{
	public $id = NULL;
	public $minify = false;
	public $name = NULL;
	public $value = NULL;
	public $tagName = NULL;
	public $classList = [];
	public $onClick = NULL;
	public $attributes = NULL;
	public $parent = NULL;
	public $children = [];
	public $innerText = NULL;
	public $closetag = true;

	function __construct(
		string $tagName,
		string $id = NULL,
		string $name = NULL,
		string $value = NULL,
		array $classList = []
	)
	{
		$this->tagName = $tagName;
		$this->id = $id;
		$this->name = $name;
		$this->value = $value;
		$this->classList = $classList;
	}

	function __toString() : string
	{
		$str = "<";
		$str .= $this->tagName. " ";
		$str .= $this->id ? "id=\"$this->id\" " : "";
		if (!empty($this->classList))
		{
			$str .= "class=\"";
			foreach($this->classList as $class)
				$str .= $class." ";
			$str = rtrim($str, " ");
			$str .= "\" ";
		}
		$str .= ($this->onClick) ? "onClick=\"$this->onClick\" " : "";

		foreach($this->attributes as $attribute => $value)
		{
			$str .= "$attribute";
			$str .= $value ? "=\"$value\" " : " ";
		}
		$n = $this->minify ? "" : "\n\t";
		$str = rtrim($str, " ");
		$str .= ">$this->innerText$n";
		foreach ($this->children as $child)
			$str .= $child;
		$str .= $this->closetag ? "</$this->tagName>$n" : "$n";
		return $str;
	}

	function setAttribute($attribute, $value = NULL) : void
	{
		if (is_string($attribute) && is_string($value))
			$this->attributes[$attribute] = $value;

		else if (is_array($attribute) && is_array($value))
			foreach($attribute as $i => $a)
				$this->attributes[$a] = isset($value[$i]) ? $value[$i] : null;
	}
	function delAttribute(string $attribute) : void
	{
		unset($this->attributes[$attribute]);
	}
	function addChild(HTMLElement &$element) : void
	{
		$this->children[] = &$element;
		$element->parent = &$this;
	}
	function setParent(HTMLElement &$element) : void
	{
		$this->parent = &$element;
		$element->children[] = &$this;
	}
	function delChildByID(string $id) : bool
	{
		foreach ($this->children as $v => $child)
			if ($child->id == $id)
			{
				$child->parent = NULL;
				unset($this->children[$v]);
				return true;
			}
		return false;
	}
	function spawnChild(string $tagName) : HTMLElement
	{
		$child = new HTMLElement($tagName);
		$this->addChild($child);
		return $child;
	}
	function dupChild(string $id)
	{
		$newChild = NULL;
		foreach($this->children as $child)
			if ($child->id == $id)
			{
				$newChild = $child;
				$this->addChild($newChild);
			}
		return $newChild ?? false;
	}
}