import ImageKit from "imagekit-javascript";

const imageKit = new ImageKit({
    urlEndpoint: '<YOUR_IMAGEKIT_URL_ENDPOINT>',
    publicKey: '<YOUR_IMAGEKIT_PUBLIC_KEY>',
    // privateKey: '<YOUR_IMAGEKIT_PRIVATE_KEY>'
});

export const handleImageUpload = async (file: File) => {
    try {
        const uploadResponse = await imageKit.upload({
            file,
            fileName: file.name,
            useUniqueFileName: false
        });
        console.log("Image uploaded successfully", uploadResponse);
    } catch (error) {
        console.error(error);
    }
}