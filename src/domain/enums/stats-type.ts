export type StatsType =
	| 'ADD_PM2'
	| 'REM_PA'
	| 'ADD_VIE'
	| 'ADD_PA'
	| 'ADD_DOMA'
	| 'MULTIPLY_DOMMAGE'
	| 'ADD_CC'
	| 'REM_PO'
	| 'ADD_PO'
	| 'ADD_FORC'
	| 'ADD_AGIL'
	| 'ADD_PA2'
	| 'ADD_EC'
	| 'ADD_CHAN'
	| 'ADD_SAGE'
	| 'ADD_VITA'
	| 'ADD_INTE'
	| 'REM_PM'
	| 'ADD_PM'
	| 'ADD_PERDOM'
	| 'ADD_PDOM'
	| 'REM_DOMA'
	| 'REM_CHAN'
	| 'REM_VITA'
	| 'REM_AGIL'
	| 'REM_INTE'
	| 'REM_SAGE'
	| 'REM_FORC'
	| 'ADD_PODS'
	| 'REM_PODS'
	| 'ADD_AFLEE'
	| 'ADD_MFLEE'
	| 'REM_AFLEE'
	| 'REM_MFLEE'
	| 'ADD_MAITRISE'
	| 'REM_PA2'
	| 'REM_PM2'
	| 'REM_CC'
	| 'ADD_INIT'
	| 'REM_INIT'
	| 'ADD_PROS'
	| 'REM_PROS'
	| 'ADD_SOIN'
	| 'REM_SOIN'
	| 'CREATURE'
	| 'ADD_RP_TER'
	| 'ADD_RP_EAU'
	| 'ADD_RP_AIR'
	| 'ADD_RP_FEU'
	| 'ADD_RP_NEU'
	| 'REM_RP_TER'
	| 'REM_RP_EAU'
	| 'REM_RP_AIR'
	| 'REM_RP_FEU'
	| 'REM_RP_NEU'
	| 'RETDOM'
	| 'TRAPDOM'
	| 'TRAPPER'
	| 'ADD_R_FEU'
	| 'ADD_R_NEU'
	| 'ADD_R_TER'
	| 'ADD_R_EAU'
	| 'ADD_R_AIR'
	| 'REM_R_FEU'
	| 'REM_R_NEU'
	| 'REM_R_TER'
	| 'REM_R_EAU'
	| 'REM_R_AIR'
	| 'ADD_RP_PVP_TER'
	| 'ADD_RP_PVP_EAU'
	| 'ADD_RP_PVP_AIR'
	| 'ADD_RP_PVP_FEU'
	| 'ADD_RP_PVP_NEU'
	| 'REM_RP_PVP_TER'
	| 'REM_RP_PVP_EAU'
	| 'REM_RP_PVP_AIR'
	| 'REM_RP_PVP_FEU'
	| 'REM_RP_PVP_NEU'
	| 'ADD_R_PVP_TER'
	| 'ADD_R_PVP_EAU'
	| 'ADD_R_PVP_AIR'
	| 'ADD_R_PVP_FEU'
	| 'ADD_R_PVP_NEU'

export const StatTypeKeys: [string, ...string[]] = [
	'ADD_PM2',
	'REM_PA',
	'ADD_VIE',
	'ADD_PA',
	'ADD_DOMA',
	'MULTIPLY_DOMMAGE',
	'ADD_CC',
	'REM_PO',
	'ADD_PO',
	'ADD_FORC',
	'ADD_AGIL',
	'ADD_PA2',
	'ADD_EC',
	'ADD_CHAN',
	'ADD_SAGE',
	'ADD_VITA',
	'ADD_INTE',
	'REM_PM',
	'ADD_PM',
	'ADD_PERDOM',
	'ADD_PDOM',
	'REM_DOMA',
	'REM_CHAN',
	'REM_VITA',
	'REM_AGIL',
	'REM_INTE',
	'REM_SAGE',
	'REM_FORC',
	'ADD_PODS',
	'REM_PODS',
	'ADD_AFLEE',
	'ADD_MFLEE',
	'REM_AFLEE',
	'REM_MFLEE',
	'ADD_MAITRISE',
	'REM_PA2',
	'REM_PM2',
	'REM_CC',
	'ADD_INIT',
	'REM_INIT',
	'ADD_PROS',
	'REM_PROS',
	'ADD_SOIN',
	'REM_SOIN',
	'CREATURE',
	'ADD_RP_TER',
	'ADD_RP_EAU',
	'ADD_RP_AIR',
	'ADD_RP_FEU',
	'ADD_RP_NEU',
	'REM_RP_TER',
	'REM_RP_EAU',
	'REM_RP_AIR',
	'REM_RP_FEU',
	'REM_RP_NEU',
	'RETDOM',
	'TRAPDOM',
	'TRAPPER',
	'ADD_R_FEU',
	'ADD_R_NEU',
	'ADD_R_TER',
	'ADD_R_EAU',
	'ADD_R_AIR',
	'REM_R_FEU',
	'REM_R_NEU',
	'REM_R_TER',
	'REM_R_EAU',
	'REM_R_AIR',
	'ADD_RP_PVP_TER',
	'ADD_RP_PVP_EAU',
	'ADD_RP_PVP_AIR',
	'ADD_RP_PVP_FEU',
	'ADD_RP_PVP_NEU',
	'REM_RP_PVP_TER',
	'REM_RP_PVP_EAU',
	'REM_RP_PVP_AIR',
	'REM_RP_PVP_FEU',
	'REM_RP_PVP_NEU',
	'ADD_R_PVP_TER',
	'ADD_R_PVP_EAU',
	'ADD_R_PVP_AIR',
	'ADD_R_PVP_FEU',
	'ADD_R_PVP_NEU',
]

export const StatsToId: Record<StatsType, number> = {
	['ADD_PM2']: 78,
	['REM_PA']: 101,
	['ADD_VIE']: 110,
	['ADD_PA']: 111,
	['ADD_DOMA']: 121,
	['MULTIPLY_DOMMAGE']: 114,
	['ADD_CC']: 115,
	['REM_PO']: 116,
	['ADD_PO']: 117,
	['ADD_FORC']: 118,
	['ADD_AGIL']: 119,
	['ADD_PA2']: 120,
	['ADD_EC']: 122,
	['ADD_CHAN']: 123,
	['ADD_SAGE']: 124,
	['ADD_VITA']: 125,
	['ADD_INTE']: 126,
	['REM_PM']: 127,
	['ADD_PM']: 128,
	['ADD_PERDOM']: 138,
	['ADD_PDOM']: 142,
	['REM_DOMA']: 145,
	['REM_CHAN']: 152,
	['REM_VITA']: 153,
	['REM_AGIL']: 154,
	['REM_INTE']: 155,
	['REM_SAGE']: 156,
	['REM_FORC']: 157,
	['ADD_PODS']: 158,
	['REM_PODS']: 159,
	['ADD_AFLEE']: 160,
	['ADD_MFLEE']: 161,
	['REM_AFLEE']: 162,
	['REM_MFLEE']: 163,
	['ADD_MAITRISE']: 165,
	['REM_PA2']: 168,
	['REM_PM2']: 169,
	['REM_CC']: 171,
	['ADD_INIT']: 174,
	['REM_INIT']: 175,
	['ADD_PROS']: 176,
	['REM_PROS']: 177,
	['ADD_SOIN']: 178,
	['REM_SOIN']: 179,
	['CREATURE']: 182,
	['ADD_RP_TER']: 210,
	['ADD_RP_EAU']: 211,
	['ADD_RP_AIR']: 212,
	['ADD_RP_FEU']: 213,
	['ADD_RP_NEU']: 214,
	['REM_RP_TER']: 215,
	['REM_RP_EAU']: 216,
	['REM_RP_AIR']: 217,
	['REM_RP_FEU']: 218,
	['REM_RP_NEU']: 219,
	['RETDOM']: 220,
	['TRAPDOM']: 225,
	['TRAPPER']: 226,
	['ADD_R_FEU']: 240,
	['ADD_R_NEU']: 241,
	['ADD_R_TER']: 242,
	['ADD_R_EAU']: 243,
	['ADD_R_AIR']: 244,
	['REM_R_FEU']: 245,
	['REM_R_NEU']: 246,
	['REM_R_TER']: 247,
	['REM_R_EAU']: 248,
	['REM_R_AIR']: 249,
	['ADD_RP_PVP_TER']: 250,
	['ADD_RP_PVP_EAU']: 251,
	['ADD_RP_PVP_AIR']: 252,
	['ADD_RP_PVP_FEU']: 253,
	['ADD_RP_PVP_NEU']: 254,
	['REM_RP_PVP_TER']: 255,
	['REM_RP_PVP_EAU']: 256,
	['REM_RP_PVP_AIR']: 257,
	['REM_RP_PVP_FEU']: 258,
	['REM_RP_PVP_NEU']: 259,
	['ADD_R_PVP_TER']: 260,
	['ADD_R_PVP_EAU']: 261,
	['ADD_R_PVP_AIR']: 262,
	['ADD_R_PVP_FEU']: 263,
	['ADD_R_PVP_NEU']: 264,
}

export const IdToStatType: Record<number, StatsType> = {
	[78]: 'ADD_PM2',
	[101]: 'REM_PA',
	[110]: 'ADD_VIE',
	[111]: 'ADD_PA',
	[121]: 'ADD_DOMA',
	[114]: 'MULTIPLY_DOMMAGE',
	[115]: 'ADD_CC',
	[116]: 'REM_PO',
	[117]: 'ADD_PO',
	[118]: 'ADD_FORC',
	[119]: 'ADD_AGIL',
	[120]: 'ADD_PA2',
	[122]: 'ADD_EC',
	[123]: 'ADD_CHAN',
	[124]: 'ADD_SAGE',
	[125]: 'ADD_VITA',
	[126]: 'ADD_INTE',
	[127]: 'REM_PM',
	[128]: 'ADD_PM',
	[138]: 'ADD_PERDOM',
	[142]: 'ADD_PDOM',
	[145]: 'REM_DOMA',
	[152]: 'REM_CHAN',
	[153]: 'REM_VITA',
	[154]: 'REM_AGIL',
	[155]: 'REM_INTE',
	[156]: 'REM_SAGE',
	[157]: 'REM_FORC',
	[158]: 'ADD_PODS',
	[159]: 'REM_PODS',
	[160]: 'ADD_AFLEE',
	[161]: 'ADD_MFLEE',
	[162]: 'REM_AFLEE',
	[163]: 'REM_MFLEE',
	[165]: 'ADD_MAITRISE',
	[168]: 'REM_PA2',
	[169]: 'REM_PM2',
	[171]: 'REM_CC',
	[174]: 'ADD_INIT',
	[175]: 'REM_INIT',
	[176]: 'ADD_PROS',
	[177]: 'REM_PROS',
	[178]: 'ADD_SOIN',
	[179]: 'REM_SOIN',
	[182]: 'CREATURE',
	[210]: 'ADD_RP_TER',
	[211]: 'ADD_RP_EAU',
	[212]: 'ADD_RP_AIR',
	[213]: 'ADD_RP_FEU',
	[214]: 'ADD_RP_NEU',
	[215]: 'REM_RP_TER',
	[216]: 'REM_RP_EAU',
	[217]: 'REM_RP_AIR',
	[218]: 'REM_RP_FEU',
	[219]: 'REM_RP_NEU',
	[220]: 'RETDOM',
	[225]: 'TRAPDOM',
	[226]: 'TRAPPER',
	[240]: 'ADD_R_FEU',
	[241]: 'ADD_R_NEU',
	[242]: 'ADD_R_TER',
	[243]: 'ADD_R_EAU',
	[244]: 'ADD_R_AIR',
	[245]: 'REM_R_FEU',
	[246]: 'REM_R_NEU',
	[247]: 'REM_R_TER',
	[248]: 'REM_R_EAU',
	[249]: 'REM_R_AIR',
	[250]: 'ADD_RP_PVP_TER',
	[251]: 'ADD_RP_PVP_EAU',
	[252]: 'ADD_RP_PVP_AIR',
	[253]: 'ADD_RP_PVP_FEU',
	[254]: 'ADD_RP_PVP_NEU',
	[255]: 'REM_RP_PVP_TER',
	[256]: 'REM_RP_PVP_EAU',
	[257]: 'REM_RP_PVP_AIR',
	[258]: 'REM_RP_PVP_FEU',
	[259]: 'REM_RP_PVP_NEU',
	[260]: 'ADD_R_PVP_TER',
	[261]: 'ADD_R_PVP_EAU',
	[262]: 'ADD_R_PVP_AIR',
	[263]: 'ADD_R_PVP_FEU',
	[264]: 'ADD_R_PVP_NEU',
}
