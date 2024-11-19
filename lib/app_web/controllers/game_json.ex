defmodule AppWeb.GameJSON do
  def daily(%{game: game}) do
    %{
      groups: game.groups
    }
  end
end
