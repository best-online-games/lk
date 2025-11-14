namespace $.$$ {
	new $mol_after_frame(() => {
		$hyoo_crus_yard.masters = ['https://crus.hd4.ru/']
		$hyoo_crus_glob.yard().sync()
	})

	export class $bog_lk extends $.$bog_lk {
		@$mol_mem
		profile() {
			return this.$.$hyoo_crus_glob.home().hall_by($bog_lk_profile, {})
		}

		protected profile_text(
			field: (profile: $bog_lk_profile) => $hyoo_crus_text | null,
			next?: string,
		) {
			const profile = this.profile()
			const atom = profile ? field(profile) : null
			if (!atom) return ''

			return atom.text(next)
		}

		@$mol_mem
		full_name(next?: string) {
			return this.profile_text(profile => profile.FullName(), next)
		}

		@$mol_mem
		nickname(next?: string) {
			return this.profile_text(profile => profile.Nickname(), next)
		}

		@$mol_mem
		bio(next?: string) {
			return this.profile_text(profile => profile.Bio(), next)
		}

		@$mol_mem
		city(next?: string) {
			return this.profile_text(profile => profile.City(), next)
		}

		@$mol_mem
		country(next?: string) {
			return this.profile_text(profile => profile.Country(), next)
		}

		@$mol_mem
		website(next?: string) {
			return this.profile_text(profile => profile.Website(), next)
		}

		@$mol_mem
		email(next?: string) {
			return this.profile_text(profile => profile.Email(), next)
		}

		@$mol_mem
		telegram(next?: string) {
			return this.profile_text(profile => profile.Telegram(), next)
		}

		@$mol_mem
		github(next?: string) {
			return this.profile_text(profile => profile.Github(), next)
		}

		@$mol_mem
		twitter(next?: string) {
			return this.profile_text(profile => profile.Twitter(), next)
		}

		@$mol_mem
		peer_id() {
			return this.$.$hyoo_crus_glob.home().land().auth().peer()
		}

		@$mol_mem
		display_name_text() {
			return this.full_name().trim() || this.nickname().trim() || '—'
		}

		@$mol_mem
		username_preview_text() {
			const nick = this.nickname().trim().replace(/^@+/, '')
			return nick ? `@${nick}` : ''
		}

		@$mol_mem
		bio_preview_text() {
			const bio = this.bio().trim()
			if (bio.length <= 180) return bio
			return `${bio.slice(0, 177)}...`
		}
	}
}
