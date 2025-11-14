namespace $.$$ {
	$mol_style_define($bog_lk_profile_avatar, {
		width: '6rem',
		height: '6rem',
		background: { color: $mol_theme.card },
		border: { radius: $mol_gap.round },
		padding: 0,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
		position: 'relative',

		$mol_image: {
			width: '100%',
			height: '100%',
			maxWidth: '100%',
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

		Icon: {
			width: '50%',
			height: '50%',
		},
	})
}

