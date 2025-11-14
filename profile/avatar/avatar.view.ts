namespace $.$$ {
	// Single-avatar upload control sized like mol_attach tile (6rem x 6rem).
	// Subclasses $mol_button_open to reuse native file input behavior.
	export class $bog_lk_profile_avatar extends $.$mol_button_open {
		@$mol_mem
		profile() {
			// Current user profile in CRUS
			return $hyoo_crus_glob.home().hall_by($bog_lk_person, {})
		}

		accept() {
			return 'image/*'
		}
		multiple() {
			return false
		}

		@$mol_mem
		image_data() {
			const bins = this.profile()?.Photos()?.remote_list() ?? []
			return bins[0]?.val() ?? null
		}

		@$mol_mem
		image_uri() {
			const data = this.image_data()
			if (!data) return ''
			const blob = new Blob([data], { type: 'image/*' })
			return URL.createObjectURL(blob)
		}

		// Visual content: current image (if exists) or upload icon, plus native input to catch clicks
		sub() {
			const has_image = !!this.image_data()
			const view = has_image ? this.Image() : this.Icon()

			// Ensure native file input is present and clickable over the whole tile
			return [view, this.Native()]
		}

		Image() {
			const $ = this.$
			return $.$mol_image.make({
				title: $mol_const(''),
				uri: () => this.image_uri(),
			})
		}

		Icon() {
			const $ = this.$
			return $.$mol_icon_upload.make({})
		}

		// Handle file selection: keep only one image in Photos
		files(next?: readonly File[]) {
			if (next && next.length) {
				const person = this.profile()!
				const list = person.Photos(null)!
				const existed = person.Photos()?.remote_list() ?? []

				// Remove previous avatar if any
				if (existed[0]) list.has(existed[0].ref(), false)

				// Save new avatar to CRUS
				const blob = this.$.$mol_wire_sync(next[0]).arrayBuffer()
				const bin = list.remote_make({})!
				bin.val(new Uint8Array(blob))
			}
			// reset input value to allow re-upload same file later
			return []
		}
	}
}

