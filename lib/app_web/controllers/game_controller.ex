defmodule AppWeb.GameController do
  alias AppWeb.Game.Groups
  use AppWeb, :controller
  import AppWeb.Game

  def daily(conn, _params) do
    l = %Groups{}
    render(conn, game: l)
  end

  defp game do
    %{groups: [ %{name: "Movimentam o barco",
    level: 0,
    members: [
     "Vela",
     "Motor",
     "Remo",
     "Corrente"
    ]},
  %{name: "Iluminadores",
   level: 1,
   members: [
     "Lâmpada",
     "Lanterna",
     "Fogueira",
     "Lamparina"
   ]},
  %{name: "Gatos da ficção",
   level: 2,
   members: [
     "Tom",
     "Frajola",
     "Salém",
     "Mingau"
   ]},
  %{name: "Características da música",
   level: 3,
   members: [
     "Melodia",
     "Ritmo",
     "Harmonia",
     "Tempo"
   ]}],
   startingGroups: [["Lanterna", "Vela", "Melodia", "Tom"],
                    ["Motor", "Fogueira", "Salém", "Ritmo"],
                    ["Harmonia", "Tempo", "Mingau", "Corrente"],
                    ["Remo", "Frajola", "Lamparina", "Lâmpada"]]}
  end
end
