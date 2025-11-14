namespace $.$$ {
	export class $bog_lk_profile extends $.$bog_lk_profile {
		@$mol_mem
		profile() {
			return this.$.$bog_lk.profile()
		}

		@$mol_mem
		Info_peer() {
			const $ = this.$
			return $.$mol_text.make({
				text: () => {
					const peer = this.$.$hyoo_crus_glob.home().land().auth().peer()
					return `User ID: ${peer}`
				},
			})
		}

		@$mol_mem
		Avatar() {
			const $ = this.$
			return $.$bog_lk_profile_avatar.make({})
		}

		@$mol_mem
		Name_field() {
			const $ = this.$
			const profile = this.profile()
			return $.$mol_string.make({
				hint: () => 'Name',
				value: (next?: string) => {
					if (next !== undefined && profile) {
						profile.Name(null)!.str(next)
						return next
					}
					return profile?.Name()?.str() ?? ''
				},
			})
		}

		@$mol_mem
		Email_field() {
			const $ = this.$
			const profile = this.profile()
			return $.$mol_string.make({
				hint: () => 'Email',
				value: (next?: string) => {
					if (next !== undefined && profile) {
						profile.Email(null)!.str(next)
						return next
					}
					return profile?.Email()?.str() ?? ''
				},
			})
		}

		@$mol_mem
		Bio_field() {
			const $ = this.$
			const profile = this.profile()
			return $.$mol_textarea.make({
				hint: () => 'Bio',
				value: (next?: string) => {
					if (next !== undefined && profile) {
						profile.Bio(null)!.str(next)
						return next
					}
					return profile?.Bio()?.str() ?? ''
				},
			})
		}

		@$mol_mem
		images() {
			const profile = this.profile()
			const bins = profile?.Photos()?.remote_list() ?? []
			return bins.map(bin => {
				const data = bin.val()
				if (!data) return ''
				const blob = new Blob([data], { type: 'image/*' })
				return URL.createObjectURL(blob)
			})
		}

		@$mol_action
		attach_add_files(files: File[]) {
			if (!files || files.length === 0) return
			const profile = this.profile()
			if (!profile) return
			for (const file of files) {
				const buf = new Uint8Array(this.$.$mol_wire_sync(file).arrayBuffer())
				const bin = profile.Photos(null)!.remote_make({})!
				bin.val(buf)
			}
		}

		@$mol_action
		attach_remove_index(index: number) {
			const profile = this.profile()
			const list = profile?.Photos()?.remote_list() ?? []
			const bin = list[index]
			if (!bin) return
			const url = this.images()[index]
			if (url) {
				try {
					URL.revokeObjectURL(url)
				} catch {}
			}
			profile!.Photos(null)!.has(bin.ref(), false)
		}

		@$mol_mem
		Photos_section() {
			const $ = this.$
			const images = this.images()
			const self = this
			const text_photos = $.$mol_text.make({ text: () => 'Photos:' })
			const text_remove = $.$mol_text.make({ text: () => 'Remove' })
			const text_add_photo = $.$mol_text.make({ text: () => 'Add Photo' })
			return $.$mol_row.make({
				sub: () => [
					text_photos,
					...images.map((url, index) =>
						$.$mol_row.make({
							sub: () => [
								$.$mol_image.make({
									uri: () => url,
								}),
								$.$mol_button.make({
									sub: () => [text_remove],
									click: () => {
										self.attach_remove_index(index)
									},
								}),
							],
						}),
					),
					$.$mol_button_open.make({
						sub: () => [text_add_photo],
						accept: () => 'image/*',
						multiple: () => true,
						files: (next?: readonly File[]) => {
							if (next && next.length) {
								self.attach_add_files([...next])
							}
							return []
						},
					}),
				],
			})
		}

		@$mol_mem
		links() {
			const profile = this.profile()
			return profile?.Links()?.remote_list() ?? []
		}

		@$mol_action
		link_add() {
			const profile = this.profile()
			if (!profile) return
			const link = profile.Links(null)!.remote_make({})!
			link.Title(null)!.str('New Link')
			link.Url(null)!.str('https://')
		}

		@$mol_action
		link_remove(link: $bog_lk_link) {
			const profile = this.profile()
			if (!profile) return
			profile.Links(null)!.has(link.ref(), false)
		}

		@$mol_mem
		Links_section() {
			const $ = this.$
			const links = this.links()
			const self = this
			const text_links = $.$mol_text.make({ text: () => 'Links:' })
			const text_remove = $.$mol_text.make({ text: () => 'Remove' })
			const text_add = $.$mol_text.make({ text: () => 'Add Link' })
			return $.$mol_row.make({
				sub: () => [
					text_links,
					...links.map(link =>
						$.$mol_row.make({
							sub: () => [
								$.$mol_string.make({
									hint: () => 'Title',
									value: (next?: string) => {
										if (next !== undefined) {
											link.Title(null)!.str(next)
											return next
										}
										return link.Title()?.str() ?? ''
									},
								}),
								$.$mol_string.make({
									hint: () => 'URL',
									value: (next?: string) => {
										if (next !== undefined) {
											link.Url(null)!.str(next)
											return next
										}
										return link.Url()?.str() ?? ''
									},
								}),
								$.$mol_button.make({
									sub: () => [text_remove],
									click: () => {
										self.link_remove(link)
									},
								}),
							],
						}),
					),
					$.$mol_button.make({
						sub: () => [text_add],
						click: () => {
							self.link_add()
						},
					}),
				],
			})
		}
	}
}

