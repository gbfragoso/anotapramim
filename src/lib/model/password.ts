import argon2 from 'argon2';

function getTimeCost() {
	return process.env.NODE_ENV !== 'production' ? 1 : 3;
}

async function hash(password: string) {
	const timeCost = getTimeCost();
	return await argon2.hash(password, { timeCost });
}

async function verify(hash: string, password: string) {
	return await argon2.verify(hash, password);
}

const password = {
	hash,
	verify,
	getTimeCost
};

export default password;
