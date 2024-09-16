/*
Assessment Requirements
1. Create a variable that can hold a number of NFT's. What type of variable might this be?
2. Create an object inside your mintNFT function that will hold the metadata for your NFTs. 
   The metadata values will be passed to the function as parameters. When the NFT is ready, 
   you will store it in the variable you created in step 1
3. Your listNFTs() function will print all of your NFTs metadata to the console (i.e. console.log("Name: " + someNFT.name))
4. For good measure, getTotalSupply() should return the number of NFT's you have created
*/

// create a variable to hold your NFT's

// this function will take in some values as parameters, create an
// NFT object using the parameters passed to it for its metadata, 
// and store it in the variable above.

let nfts = [];

function mintNFT(song, artist, genre) {
    const nft = {
        song: song,
        artist: artist,
        genre: genre
    };
    nfts.push(nft);  // store the NFT object in the array
    console.log("Minted: " + song);
}

// create a "loop" that will go through an "array" of NFT's
// and print their metadata with console.log()

function listNFTs() {
    nfts.forEach((nft, index) => {
        console.log(`NFT ${index + 1}:`);
        console.log("Name: " + nft.song);
        console.log("Artist: " + nft.artist);
        console.log("Description: " + nft.genre);
        console.log("-------------------");
    });
}

// print the total number of NFTs we have minted to the console
function getTotalSupply() {
    return nfts.length;
}

// call your functions below this line
mintNFT("Houdini", "Eminem", "Rap");
mintNFT("3:15", "Russ", "R&B");

// Listing all NFTs
listNFTs();

// Getting total supply
console.log("Total NFTs minted: " + getTotalSupply());