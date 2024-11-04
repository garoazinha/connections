defmodule App.GameCreatorService do
  alias App.Repo
  alias App.Group
  alias App.Game

  def execute() do

    data = %{
      groups: [
        %{title: "Movimentam o barco",
          level: 0,
          members: [
          "Vela",
          "Motor",
          "Remo",
          "Corrente"
        ]},
        %{title: "Iluminadores",
          level: 1,
          members: [
            "Lâmpada",
            "Lanterna",
            "Fogueira",
            "Lamparina"
        ]},
        %{title: "Gatos da ficção",
          level: 2,
          members: [
            "Tom",
            "Frajola",
            "Salém",
            "Mingau"
        ]},
        %{title: "Características da música",
          level: 3,
          members: [
            "Melodia",
            "Ritmo",
            "Harmonia",
            "Tempo"
        ]}
      ],
      startingGroups: []
    }

    game = Game.changeset(%Game{}, %{extra: "false"})



    Repo.insert(game)



  end

  defp add_group(group) do
    IO.puts(group)
  end
end
