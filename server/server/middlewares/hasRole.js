export const checkHasRole = (roles) => (req, res, next) => {
	if (!roles.includes(req.user.role)) {
		return res.status(401).json({
			message: 'Доступ запрещен',
		});
	}

	next();
};
