namespace $ {
	export const $bog_lk_profile_preset = {
		'': $hyoo_crus_rank_read,
	} as const

	export class $bog_lk_profile extends $hyoo_crus_entity.with({
		FullName: $hyoo_crus_text,
		Nickname: $hyoo_crus_text,
		Bio: $hyoo_crus_text,
		City: $hyoo_crus_text,
		Country: $hyoo_crus_text,
		Website: $hyoo_crus_text,
		Email: $hyoo_crus_text,
		Telegram: $hyoo_crus_text,
		Github: $hyoo_crus_text,
		Twitter: $hyoo_crus_text,
		Photos: $hyoo_crus_list_ref_to(() => $hyoo_crus_atom_bin),
	}) {}
}
