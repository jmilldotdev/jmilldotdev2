/* eslint-disable no-console */
const chalk = require('chalk');
const fs = require('fs');
require('dotenv').config({ path: '.env.development.local' });
var cloudinary = require('cloudinary').v2;

(async () => {
  console.info(chalk.cyan('info'), ` - Generating Notes`);
  const VAULT_DIR = process.env.VAULT_DIR;
  const IMG_DIR = process.env.IMG_DIR;
  const ROOT_DIR = process.cwd();
  const NOTES_DIR = `${ROOT_DIR}/content/notes`;
  const IMAGE_REGEX = /\!\[\[(.+)\]\]/g;

  const getImages = (mdfile) => {
    const images = [];
    let match;
    while ((match = IMAGE_REGEX.exec(mdfile))) {
      images.push(match[1]);
    }
    return images;
  };

  const prepare = async (mdFile) => {
    let note = fs.readFileSync(`${VAULT_DIR}/${mdFile}`, 'utf8');
    const shouldPublish = note.includes('publish: true');
    if (!shouldPublish) {
      return;
    }
    const images = getImages(note);
    const noteName = mdFile.replace('.md', '');

    // // Upload images to cloudinary
    // let imageUrls = images.map(async (image) => {
    //   const imagePath = `${IMG_DIR}/${image}`;
    //   const imageName = image.split('/').pop().replace('.png', '');
    //   console.info(chalk.cyan('info'), ` - Uploading image ${imageName}`);
    //   const imageUpload = await cloudinary.uploader.upload(imagePath, {
    //     public_id: imageName,
    //     resource_type: 'auto',
    //     folder: `jmill.dev/notes/${noteName}`,
    //     overwrite: false,
    //   });
    //   console.info(chalk.green('info'), ` - Uploaded ${image}`);
    //   return {
    //     image: image,
    //     url: imageUpload.secure_url,
    //   };
    // });

    // // Resolve all promises
    // imageUrls = await Promise.all(imageUrls);

    // // Replace images with cloudinary urls
    // imageUrls.forEach((image) => {
    //   note = note.replace(
    //     `![[${image.image}]]`,
    //     `<img src="${image.url}" alt="${image.image}"/>`
    //   );
    // });

    // Write note to content folder
    const slugifiedFileName = noteName.replace(/\s+/g, '-').toLowerCase();
    fs.writeFileSync(`${NOTES_DIR}/${slugifiedFileName}.mdx`, note, 'utf8');
    chalk.green('info', ` - Generated ${noteName}`);
  };

  try {
    const mdFiles = fs
      .readdirSync(VAULT_DIR)
      .filter((file) => file.endsWith('.md'));
    mdFiles.forEach(async (mdFile) => {
      await prepare(mdFile);
    });
  } catch (error) {
    console.error(
      chalk.red('error'),
      ` - An error occurred while generating the notes`
    );
    console.error(error);
    process.exit(1);
  }
})();
