namespace $.$$ {
	$mol_style_define($bog_lk_avatar, {
		width: '8rem',
		height: '8rem',
		background: { color: $mol_theme.card },
		border: { radius: '50%' },
		padding: 0,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
		position: 'relative',
		boxShadow: `0 0 0 1px ${$mol_theme.line}`,

		$mol_image: {
			width: '100%',
			height: '100%',
			objectFit: 'cover',
		},

		Native: {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			opacity: 0,
			cursor: 'pointer',
		},

		Placeholder: {
			fontSize: '2rem',
			color: $mol_theme.shade,
		},
	})
}
