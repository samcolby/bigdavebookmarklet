

const clues = [
    "1a ","2a ","3a ","4a ","5a ","6a ","7a ","8a ","9a ",
    "10a","11a","12a","13a","14a","15a","16a","17a","18a","19a",
    "20a","21a","22a","23a","24a","25a","26a","27a","28a","29a",
    "30a","31a","32a","33a","34a","35a","36a","37a","38a","39a",
    "1d ","2d ","3d ","4d ","5d ","6d ","7d ","8d ","9d ",
    "10d","11d","12d","13d","14d","15d","16d","17d","18d","19d",
    "20d","21d","22d","23d","24d","25d","26d","27d","28d","29d",
    "30d","31d","32d","33d","34d","35d","36d","37d","38d","39d"
];

const arrAnchorIds = clues.map( (clue) => 'jsanchor-' + clue.trim() );

const arrReplaceRegexs = clues.map( (clue) => new RegExp( '\\b' + clue.trim(), "gi" ) );


const createAnchors = () => {

    const getClueNo = (text) => text.substring(0,3).replace(/\s/g, " ");

    const insertAnchor = (tag, clueNo) => {
        const anchor = document.createElement("a");
        const anchorName = arrAnchorIds[clues.indexOf(clueNo)];
        anchor.name = anchorName;
        anchor.id = anchorName;
        tag.insertBefore( anchor, tag.firstChild );
    };

    const insertAnchorsToClues = (tag, i) => {
        html = tag.innerText.trim();
        clueNo = getClueNo( html );
        if ( clueNo && clues.includes( clueNo ) ) {
            insertAnchor(tag, clueNo);
        }
    };

    const entries = document.getElementsByClassName("entry-content");
    const pTags = entries[0].getElementsByTagName("p");
    Array.from(pTags).map(insertAnchorsToClues);

};

const createLinks = () => {

    const anchorExists = (idx) => document.getElementById( arrAnchorIds[idx] );

    const replaceCommentedCluesWithLinks = (tag, i) => {
        html = tag.innerHTML;
        for ( i = 0; i < clues.length; i++ ) {
            if ( anchorExists(i) ) {
                html = html.replace( arrReplaceRegexs[i], ' <a href="#' + arrAnchorIds[i] + '" title="Goto to clue definition">' + clues[i].trim() + '</a>');
            }
        }
        tag.innerHTML = html;
    };

    const comments = document.getElementsByClassName("comment-text");
    Array.from(comments).map(replaceCommentedCluesWithLinks);

};


createAnchors();
createLinks();

