namespace $.$$ {
	$mol_style_define($bog_lk, {
		maxWidth: '50rem',
			margin: {
				left: 'auto',
				right: 'auto',
			},
		padding: $mol_gap.block,
		gap: $mol_gap.block,

		Hero: {
			gap: $mol_gap.block,
			alignItems: 'center',
		},

		Hero_meta: {
			gap: $mol_gap.block,
			alignItems: 'flex-start',
			justifyContent: 'space-between',
			flex: {
				grow: 1,
			},
		},

		Hero_info: {
			gap: $mol_gap.text,
		},

		Display_name: {
			font: {
				size: '1.75rem',
				weight: 600,
			},
		},

		Username_preview: {
			color: $mol_theme.shade,
		},

		Bio_preview: {
			color: $mol_theme.text,
			whiteSpace: 'pre-wrap',
		},

		Share_button: {
			alignSelf: 'flex-start',
		},

		Form_title: {
			margin: { bottom: $mol_gap.block },
			color: $mol_theme.text,
			font: {
				size: '1.1rem',
				weight: 600,
			},
		},

		Profile_form: {
			gap: $mol_gap.block,
			background: { color: $mol_theme.card },
			padding: $mol_gap.block,
			border: { radius: $mol_gap.round },
			boxShadow: `0 0 0 1px ${$mol_theme.line}`,
		},

		Basics_heading: {
			font: { weight: 600 },
		},

		Location_heading: {
			font: { weight: 600 },
			margin: { top: $mol_gap.block },
		},

		Contacts_heading: {
			font: { weight: 600 },
			margin: { top: $mol_gap.block },
		},
	})
}
