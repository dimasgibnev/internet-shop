export const deleteSession = async (sessionId) =>
	fetch(`http://localhost:3005/sessions/${sessionId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json; charset-utf-8',
		},
	});
