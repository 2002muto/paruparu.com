const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = path.join(__dirname, "../public");
const outputDir = path.join(__dirname, "../public/optimized");

// 出力ディレクトリを作成
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 画像を最適化する関数
async function optimizeImage(inputPath, outputPath, options = {}) {
  const { width, height, quality = 85, format = "webp" } = options;

  try {
    let pipeline = sharp(inputPath);

    if (width || height) {
      pipeline = pipeline.resize(width, height, {
        fit: "cover",
        position: "center",
      });
    }

    if (format === "webp") {
      pipeline = pipeline.webp({ quality });
    } else if (format === "avif") {
      pipeline = pipeline.avif({ quality });
    } else if (format === "jpeg") {
      pipeline = pipeline.jpeg({ quality });
    }

    await pipeline.toFile(outputPath);
    console.log(`✅ Optimized: ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error);
  }
}

// ディレクトリ内の画像を再帰的に処理
async function processDirectory(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (stat.isFile()) {
      const ext = path.extname(item).toLowerCase();
      if ([".jpg", ".jpeg", ".png", ".gif"].includes(ext)) {
        const relativePath = path.relative(inputDir, fullPath);
        const outputPath = path.join(
          outputDir,
          relativePath.replace(ext, ".webp")
        );

        // 出力ディレクトリを作成
        const outputDirPath = path.dirname(outputPath);
        if (!fs.existsSync(outputDirPath)) {
          fs.mkdirSync(outputDirPath, { recursive: true });
        }

        await optimizeImage(fullPath, outputPath, {
          quality: 85,
          format: "webp",
        });
      }
    }
  }
}

// メイン処理
async function main() {
  console.log("🚀 Starting image optimization...");
  await processDirectory(inputDir);
  console.log("✅ Image optimization completed!");
}

main().catch(console.error);
