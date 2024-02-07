defmodule AppWeb.GameJSON do
  def daily(%{game: game}) do
    %{
      groups: game.groups,
      startingGroups: game.startingGroups
    }
  end
end
