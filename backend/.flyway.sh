# Flyway CLI setup for this repo. Must be sourced (not executed) so exports and
# the flyway() wrapper apply to your current shell.
#
#   source /path/to/backend/.flyway.sh
#   # or from repo root:
#   source backend/.flyway.sh
#
# Then: flyway info | flyway migrate | flyway validate
# Delegates to this directory's ./flyway helper (same as running ./flyway from backend/).

case "${ZSH_VERSION:-}" in
?*)
	_CD_BACKEND="$(cd "$(dirname "${(%):-%x}")" && pwd)"
	;;
*)
	if [ -n "${BASH_SOURCE[0]:-}" ]; then
		_CD_BACKEND="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
	else
		_CD_BACKEND="$(cd "$(dirname "$0")" && pwd)"
	fi
	;;
esac

export COMMISSIONDESK_BACKEND="$_CD_BACKEND"

flyway() {
	"$_CD_BACKEND/flyway" "$@"
}

unset _CD_BACKEND
