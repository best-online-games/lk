namespace $.$$ {
	new $mol_after_frame(() => {
		$hyoo_crus_yard.masters = ['https://crus.hd4.ru/']
		$hyoo_crus_glob.yard().sync()
	})

	export class $bog_lk extends $.$bog_lk {
		private share_feedback_timer: $mol_after_timeout | null = null

		@$mol_mem
		share_ref() {
			return this.$.$mol_state_arg.value('profile')
		}

		@$mol_mem
		can_edit() {
			return !this.share_ref()
		}

		@$mol_mem
		own_profile() {
			return this.$.$hyoo_crus_glob.home().hall_by($bog_lk_profile, $bog_lk_profile_preset)
		}

		@$mol_mem
		profile() {
			const ref = this.share_ref()
			if (ref) {
				return this.$.$hyoo_crus_glob.Node($hyoo_crus_ref(ref), $bog_lk_profile)
			}
			return this.own_profile()
		}

		protected profile_text(
			ensure: (profile: $bog_lk_profile) => $hyoo_crus_text | null,
			next?: string,
		) {
			const profile = this.profile()
			const atom = profile ? ensure(profile) : null
			if (!atom) return ''

			if (next !== undefined) {
				if (!this.can_edit()) return atom.text()
				return atom.text(next)
			}

			return atom.text()
		}

		@$mol_mem
		full_name(next?: string) {
			return this.profile_text(profile => profile.FullName(null), next)
		}

		@$mol_mem
		nickname(next?: string) {
			return this.profile_text(profile => profile.Nickname(null), next)
		}

		@$mol_mem
		bio(next?: string) {
			return this.profile_text(profile => profile.Bio(null), next)
		}

		@$mol_mem
		city(next?: string) {
			return this.profile_text(profile => profile.City(null), next)
		}

		@$mol_mem
		country(next?: string) {
			return this.profile_text(profile => profile.Country(null), next)
		}

		@$mol_mem
		website(next?: string) {
			return this.profile_text(profile => profile.Website(null), next)
		}

		@$mol_mem
		email(next?: string) {
			return this.profile_text(profile => profile.Email(null), next)
		}

		@$mol_mem
		telegram(next?: string) {
			return this.profile_text(profile => profile.Telegram(null), next)
		}

		@$mol_mem
		github(next?: string) {
			return this.profile_text(profile => profile.Github(null), next)
		}

		@$mol_mem
		twitter(next?: string) {
			return this.profile_text(profile => profile.Twitter(null), next)
		}

		@$mol_mem
		peer_id() {
			return this.profile()?.ref().description ?? this.$.$hyoo_crus_glob.home().land().auth().peer()
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

		@$mol_mem
		share_profile() {
			if (!this.can_edit()) return null
			return this.share_grant()
		}

		@$mol_mem
		share_link() {
			if (!this.can_edit()) return ''
			const ref = this.share_profile()?.ref().description
			if (!ref) return ''
			return this.$.$mol_state_arg.make_link({ profile: ref })
		}

		@$mol_mem
		share_feedback_text(next?: string) {
			return next ?? ''
		}

		@$mol_action
		ensure_public_profile() {
			const profile = this.own_profile()
			if (!profile) return null
			const land = profile.land()
			if (!land.encrypted()) return profile

			const hall = this.$.$hyoo_crus_glob.home().Hall(null)
			if (!hall) return profile

			const public_land = this.$.$hyoo_crus_glob.land_grab($bog_lk_profile_preset)
			const public_profile = public_land.Data($bog_lk_profile)

			this.copy_profile_data(profile, public_profile)
			hall.remote(public_profile)

			return public_profile
		}

		protected copy_profile_data(source: $bog_lk_profile, target: $bog_lk_profile) {
			this.copy_profile_texts(source, target)
			this.copy_profile_photos(source, target)
		}

		protected copy_profile_texts(source: $bog_lk_profile, target: $bog_lk_profile) {
			target.FullName(null)?.text(source.FullName(null)?.text() ?? '')
			target.Nickname(null)?.text(source.Nickname(null)?.text() ?? '')
			target.Bio(null)?.text(source.Bio(null)?.text() ?? '')
			target.City(null)?.text(source.City(null)?.text() ?? '')
			target.Country(null)?.text(source.Country(null)?.text() ?? '')
			target.Website(null)?.text(source.Website(null)?.text() ?? '')
			target.Email(null)?.text(source.Email(null)?.text() ?? '')
			target.Telegram(null)?.text(source.Telegram(null)?.text() ?? '')
			target.Github(null)?.text(source.Github(null)?.text() ?? '')
			target.Twitter(null)?.text(source.Twitter(null)?.text() ?? '')
		}

		protected copy_profile_photos(source: $bog_lk_profile, target: $bog_lk_profile) {
			const destination = target.Photos(null)
			if (!destination) return
			const existing = destination.remote_list()
			for (const photo of existing) destination.has(photo.ref(), false)

			const originals = source.Photos()?.remote_list() ?? []
			for (const photo of originals) {
				const data = photo.val()
				const logger = this.$.$mol_dom_context.console
				if (!data) {
					logger?.info?.('[LK Share]', 'Empty photo payload', {
						source: photo.ref().description,
					})
					continue
				}
				logger?.info?.('[LK Share]', 'Copy profile photo', {
					source: photo.ref().description,
					bytes: data.byteLength,
				})
				const bin = destination.local_make()
				bin.val(new Uint8Array(data))
			}
		}

		@$mol_action
		share_grant() {
			let profile = this.own_profile()
			if (!profile) return null
			if (profile.land().encrypted()) {
				profile = this.ensure_public_profile() ?? profile
			}
			profile.land().give(null, $hyoo_crus_rank_read)
			return profile
		}

		Profile_form() {
			const form = super.Profile_form()
			form.foot = () => [] as readonly $mol_view[]
			return form
		}

		Share_panel() {
			if (!this.can_edit()) return null as any
			return super.Share_panel()
		}

		Share_copy() {
			const button = super.Share_copy()
			button.event_click = event => this.share_copy_click(event)
			return button
		}

		share_copy_click(event?: Event) {
			event?.preventDefault()
			void this.share_copy_flow()
		}

		protected async share_copy_flow() {
			if (!this.can_edit()) return

			const link = this.share_link()
			if (!link) return

			const copied = await this.share_copy_to_clipboard(link)
			this.share_notify(copied ? 'Ссылка скопирована' : 'Скопируйте ссылку вручную')
		}

		protected async share_copy_to_clipboard(link: string) {
			const clipboard = this.$.$mol_dom_context.navigator?.clipboard
			if (clipboard?.writeText) {
				try {
					await clipboard.writeText(link)
					return true
				} catch (error) {
					this.$.$mol_dom_context.console?.warn?.('[LK Share]', 'Clipboard write failed', error)
				}
			}
			this.$.$mol_dom_context.prompt?.('Скопируйте ссылку', link)
			return false
		}

		protected share_notify(message: string) {
			this.share_feedback_text(message)
			this.share_feedback_timer?.destructor()
			this.share_feedback_timer = new this.$.$mol_after_timeout(3000, () => {
				this.share_feedback_text('')
				this.share_feedback_timer = null
			})
		}
	}
}
