#!/usr/bin/env bash

set -e

IMG_WIDTH=250
CARD=$1
FRAGMENT=bin/data/shaders/$CARD.frag
SRC_IMG=bin/data/$CARD.png
IMG_NAME=$(echo $CARD | sed 's/ //g').png
DST_IMG=images/$IMG_NAME
TITLE=$(echo $CARD | cut -d- -f2)
README="![$TITLE](https://github.com/RussTheAerialist/ofPixelSpiritDeck/raw/master/images/$IMG_NAME)"
COMMIT_MSG="Adds $TITLE"

if [ ! -f "$FRAGMENT" ]; then
   echo "$FRAGMENT not found"
	 exit 1
fi

if [ ! -f "$SRC_IMG" ]; then
	echo "$SRC_IMG not found"
	exit 1
fi

echo "Moving and Renaming Image: $SRC_IMG -> $DST_IMG"
mv "$SRC_IMG" "$DST_IMG"

echo "Resizing $DST_IMG to $IMG_WIDTH"
mogrify -resize $IMG_WIDTH "$DST_IMG"

echo "Appending README.md"
echo $README >> README.md

echo "Adding to GIT"
git add README.md "$DST_IMG" "$FRAGMENT"

echo "Committing"
git commit -m "$COMMIT_MSG"
