import { db } from "./lib/surrealdb";

const connect = async () => {
    console.log("Attempting db connection.");

	return await db.connect("wss://householddb-06aiihsivpr4b71h3h9obqd06o.aws-use1.surreal.cloud", {
		namespace: "games",
		database: "games"
	});
};

/** @type {import('@sveltejs/kit').ServerInit} */
export async function init() {
    console.log("init");

	await connect();

    console.log("connection successful");
}