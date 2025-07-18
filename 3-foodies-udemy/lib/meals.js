import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "fs";
import stream from "stream";

const db = sql("meals.db", { verbose: console.log });

export async function getAllMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
  // throw new Error("Database connection failed"); // Simulate an error
  const meals = db.prepare("SELECT * FROM meals").all();
  return meals;
}

export async function getMeal(slug) {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
  // throw new Error("Meal not found"); // Simulate an error
  const meal = db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
  return meal;
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, {
    lower: true,
    strict: true,
  });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      console.error("Error writing image file:", error);
      throw new Error("Failed to save meal image");
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT INTO meals ( title, summary, instructions, creator, creator_email,image, slug) VALUES (
      @title,
      @summary,
      @instructions,
      @creator, 
      @creator_email,
      @image,
      @slug

    )
  `
  ).run(meal);
}
