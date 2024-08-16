export const checkHasRole = (roles) => (req, res, next) => {
	if (!roles.includes(req.user.roleId)) {
		return res.status(401).json({
			message: 'Доступ запрещен',
		});
	}

	next();
};
