/* eslint-disable no-console */
const chalk = require('chalk');
const fs = require('fs');
require('dotenv').config({ path: '.env.development.local' });
var cloudinary = require('cloudinary').v2;

(async () => {
  console.info(chalk.cyan('info'), ` - Generating Posts`);
  const CMS_DIR = process.env.CMS_DIR + '/posts';
  const IMG_DIR = process.env.IMG_DIR;
  const ROOT_DIR = process.cwd();
  const POSTS_DIR = `${ROOT_DIR}/content/posts`;
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
    let post = fs.readFileSync(`${CMS_DIR}/${mdFile}`, 'utf8');
    const images = getImages(post);
    const postName = mdFile.replace('.md', '');

    // Upload images to cloudinary
    let imageUrls = images.map(async (image) => {
      const imagePath = `${IMG_DIR}/${image}`;
      const imageName = image.split('/').pop().replace('.png', '');
      console.info(chalk.cyan('info'), ` - Uploading image ${imageName}`);
      const imageUpload = await cloudinary.uploader.upload(imagePath, {
        public_id: imageName,
        resource_type: 'auto',
        folder: `jmill.dev/posts/${postName}`,
        overwrite: false,
      });
      console.info(chalk.green('info'), ` - Uploaded ${image}`);
      return {
        image: image,
        url: imageUpload.secure_url,
      };
    });

    // Resolve all promises
    imageUrls = await Promise.all(imageUrls);

    // Replace images with cloudinary urls
    imageUrls.forEach((image) => {
      post = post.replace(
        `![[${image.image}]]`,
        `<img src="${image.url}" alt="${image.image}"/>`
      );
    });

    // Write post to content folder
    fs.writeFileSync(`${POSTS_DIR}/${postName}.mdx`, post, 'utf8');
    chalk.green('info', ` - Generated ${postName}`);
  };

  try {
    const mdFiles = fs
      .readdirSync(CMS_DIR)
      .filter((file) => file.endsWith('.md'));
    mdFiles.forEach(async (mdFile) => {
      await prepare(mdFile);
    });
  } catch (error) {
    console.error(
      chalk.red('error'),
      ` - An error occurred while generating the posts`
    );
    console.error(error);
    process.exit(1);
  }
})();
