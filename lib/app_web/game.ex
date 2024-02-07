defmodule AppWeb.Game do
  defmodule Group do
    defstruct name: "Stuff", level: 2, members: ["One", "Two", "Three", "Four"]
  end

  defstruct groups: [struct(Group, %{name: "Movimentam o barco",
                       level: 0,
                       members: [
                        "Vela",
                        "Motor",
                        "Remo",
                        "Corrente"
                       ]}),
                     struct(Group, %{name: "Iluminadores",
                      level: 1,
                      members: [
                        "Lâmpada",
                        "Lanterna",
                        "Fogueira",
                        "Lamparina"
                      ]}),
                     struct(Group, %{name: "Gatos da ficção",
                      level: 2,
                      members: [
                        "Tom",
                        "Frajola",
                        "Salém",
                        "Mingau"
                      ]}),
                     struct(Group, %{name: "Características da música",
                      level: 3,
                      members: [
                        "Melodia",
                        "Ritmo",
                        "Harmonia",
                        "Tempo"
                      ]})],
                      startingGroups: [["Lanterna", "Vela", "Melodia", "Tom"],
                                       ["Motor", "Fogueira", "Salém", "Ritmo"],
                                       ["Harmonia", "Tempo", "Mingau", "Corrente"],
                                       ["Remo", "Frajola", "Lamparina", "Lâmpada"]]
end
